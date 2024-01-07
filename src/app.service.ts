import { Injectable } from '@nestjs/common';
import { Action, SerializedAction } from 'eosjs/dist/eosjs-serialize';
import { Api, JsonRpc } from 'eosjs';
import fetch from 'node-fetch';
@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }


  async serializeActions(node_url:string, actions: Action[]): Promise<SerializedAction[]> {
    
    // const signatureProvider = new JsSignatureProvider(privateKeys);
    const rpc = new JsonRpc(node_url, {fetch}); //required to read blockchain state
    const api = new Api({ 
      rpc:rpc, 
      // authorityProvider: null,
      // abiProvider: rpc,
      signatureProvider: null,      //required to submit transactions
      textEncoder: new TextEncoder, 
      textDecoder: new TextDecoder
    }); 
    return api.serializeActions(actions)
  }
}
