// src/app/core/services/web3.service.ts

import { Injectable } from '@angular/core';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
//BrowserProvider = connexion à MetaMask qui tourne dans le navigateur
// JsonRpcSigner = permet signer un message avec MetaMask
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
//map pour Transformer une valeur en une autre
import { environment } from '../../../environments/environment';

/**
 * Déclaration globale pour TypeScript
 * declare = dire à TypeScript "cette chose existe quelque part, fais-moi confiance, ne vérifie pas".
 * global = permet de modifier les types globaux du navigateur, comme window
 * on étend cette interface qui représente l'objet global du navigateur pour ajouter une nouvelle propriété.
 */
declare global {
  interface Window {
    ethereum?: any; //? peut etre ou non c'est optionnel
  }
}

/**
 * ============================
 * SERVICE WEB3 / METAMASK
 * Gère la connexion MetaMask et la signature de messages
 * ============================
 */
@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private provider: BrowserProvider | null = null; // Provider Ethereum
  private signer: JsonRpcSigner | null = null;     // Signer pour signer des messages

  constructor() {}

  /**
   * ============================
   * VÉRIFIER SI METAMASK EST INSTALLÉ
   * ============================
   */
  isMetaMaskInstalled(): boolean {
    return typeof window.ethereum !== 'undefined';
  }

  /**
   * ============================
   * CONNECTER METAMASK
   * 1. Demande l'autorisation d'accéder aux comptes
   * 2. Récupère l'adresse du wallet
   * Retourne : Observable<string> avec l'adresse wallet
   * ============================
   */
  connectWallet(): Observable<string> {
    if (!this.isMetaMaskInstalled()) {
      return throwError(() => new Error(
        'MetaMask n\'est pas installé. Veuillez l\'installer depuis metamask.io'
      ));
    }

    return from(this.connectMetaMask()).pipe( // from sert a transformer quelque chose qui n'est pas un Observable en Observable.
      catchError(error => {
        console.error('❌ Erreur connexion MetaMask:', error);

        // Code 4001 = User rejected the request
        if (error.code === 4001) {
          return throwError(() => new Error('Connexion refusée par l\'utilisateur'));
        }

        return throwError(() => new Error('Erreur lors de la connexion à MetaMask'));
      })
    );
  }

  /**
   * ============================
   * CONNEXION METAMASK (PRIVATE)
   * ============================
   */
  //Prépare la connexion MetaMask (provider)
  // Ouvre la popup MetaMask
  // Récupère la signature (signer)
  // Récupère l'adresse du wallet
  private async connectMetaMask(): Promise<string> {
    try {
      // 1. Initialiser le provider Ethereum
      this.provider = new BrowserProvider(window.ethereum);

      // 2. Demander l'accès aux comptes (popup MetaMask)
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // 3. Récupérer le signer (permet de signer des messages)
      this.signer = await this.provider.getSigner();

      // 4. Récupérer l'adresse du wallet
      const address = await this.signer.getAddress();

      return address;
    } catch (error) {
      throw error;
    }
  }

  /**
   * ============================
   * SIGNER UN MESSAGE AVEC METAMASK
   * Utilisé pour prouver la possession du wallet
   * Retourne : Observable<string> avec la signature
   * ============================
   */
  signMessage(message: string): Observable<string> {
    if (!this.signer) {
      return throwError(() => new Error('Wallet non connecté. Connectez-vous d\'abord.'));
    }

    return from(this.signer.signMessage(message)).pipe(
      catchError(error => {
        console.error('❌ Erreur signature:', error);

        // Code 4001 = User rejected the request
        if (error.code === 4001) {
          return throwError(() => new Error('Signature refusée par l\'utilisateur'));
        }

        return throwError(() => new Error('Erreur lors de la signature du message'));
      })
    );
  }

  /**
   * ============================
   * RÉCUPÉRER L'ADRESSE DU WALLET CONNECTÉ
   * Sans demander de nouvelle connexion
   * ============================
   */
  //Récupérer l'adresse actuellement connectée dans MetaMask
  getCurrentAccount(): Observable<string | null> {
    if (!this.isMetaMaskInstalled()) {
      return throwError(() => new Error('MetaMask non installé'));
    }

    return from(window.ethereum.request({ method: 'eth_accounts' }) as Promise<string[]>).pipe( // as Promise<string[]> :  dire a ts je te garantis que ce Promise va retourner un string[]
      map((accounts: string[]) => accounts.length > 0 ? accounts[0] : null),
      catchError(() => throwError(() => new Error('Impossible de récupérer le compte')))
    );
  }

  /**
   * ============================
   * DÉCONNECTER LE WALLET
   * Note : Côté application seulement, MetaMask reste connecté
   * ============================
   */
  disconnectWallet(): void {
    this.provider = null;
    this.signer = null;
  }

  /**
   * ============================
   * ÉCOUTER LES CHANGEMENTS DE COMPTE METAMASK
   * Appelé automatiquement quand l'utilisateur change de compte dans MetaMask
   * ============================
   */
  onAccountsChanged(callback: (accounts: string[]) => void): void {
    if (this.isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', callback);
    }
  }

  /**
   * ============================
   * ÉCOUTER LES CHANGEMENTS DE RÉSEAU
   * Appelé automatiquement quand l'utilisateur change de réseau dans MetaMask
   * ============================
   */
  // On passe une fonction callback=> MetaMask va appeler cette callback automatiquement quand l'utilisateur change de réseau.
  onChainChanged(callback: (chainId: string) => void): void { //  fonction prend un argument chainId: stringcette fonction ne retourne rien :=> void
    if (this.isMetaMaskInstalled()) {
      window.ethereum.on('chainChanged', callback); // 'chainChanged' = nom de l'événement MetaMask => Quand MetaMask change de réseau, exécute la callback.
    }
  }

  /**
   * ============================
   * GÉNÉRER UN MESSAGE D'AUTHENTIFICATION
   * Ce message sera signé par MetaMask pour prouver la possession du wallet
   * ============================
   */
  generateAuthMessage(walletAddress: string): string {
    const timestamp = Date.now();
    return `Sign this message to authenticate with Real Estate Rent DApp.

Wallet: ${walletAddress}
Timestamp: ${timestamp}`;
  }

  /**
   * ============================
   * VÉRIFIER LA CONNEXION AU BON RÉSEAU
   * Retourne true si le réseau correspond à celui configuré dans environment
   * ============================
   */
  async checkNetwork(): Promise<boolean> {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      return chainId === environment.blockchain.chainId;
    } catch (error) {
      console.error('❌ Erreur vérification réseau:', error);
      return false;
    }
  }

  /**
   * ============================
   * CHANGER DE RÉSEAU ETHEREUM
   // La fonction switchNetwork() sert uniquement à changer le réseau (blockchain)
   // auquel MetaMask est connecté (ex : Ethereum, Polygon, BSC, etc.).
   // Chaque réseau a son propre solde et ses propres tokens, même si l'adresse est identique.
   // Exemple : même adresse peut avoir 0.2 ETH sur Ethereum et 120 MATIC sur Polygon.
   // Cette fonction demande simplement à MetaMask de se connecter au réseau demandé.
   * ============================
   */
  async switchNetwork(): Promise<void> {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: environment.blockchain.chainId }]
      });
    } catch (error: any) {
      // Code 4902 = Réseau non ajouté dans MetaMask
      if (error.code === 4902) {
        await this.addNetwork();
      } else {
        throw error;
      }
    }
  }

  /**
   * ============================
   * AJOUTER UN RÉSEAU PERSONNALISÉ DANS METAMASK
   * ============================
   */
  private async addNetwork(): Promise<void> {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: environment.blockchain.chainId,
        chainName: environment.blockchain.chainName,
        rpcUrls: [environment.blockchain.rpcUrl]
      }]
    });
  }

  /**
   * ============================
   * ✅ NOUVEAU : CONVERTIR ETH EN WEI
   * 1 ETH = 1,000,000,000,000,000,000 Wei (10^18)
   * Utilisé pour préparer les transactions MetaMask
   * ============================
   */
  ethToWei(eth: number): string {
    // 1 ETH = 10^18 Wei
    const wei = eth * 1e18;
    return '0x' + wei.toString(16); // Convertir en hexadécimal pour MetaMask
  }

  /**
   * ============================
   * ✅ NOUVEAU : CONVERTIR WEI EN ETH
   * Pour afficher les montants de manière lisible
   * ============================
   */
  weiToEth(wei: string | number): number {
    const weiValue = typeof wei === 'string' ? parseFloat(wei) : wei;
    return weiValue / 1e18;
  }
}
