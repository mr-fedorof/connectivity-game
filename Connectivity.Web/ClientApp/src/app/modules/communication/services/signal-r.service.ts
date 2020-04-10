import { Injectable } from '@angular/core';
import { SignalRClient } from '../clients';
import { environment } from '@env';

@Injectable()
export class SignalRService {
    public createClient(url: string): SignalRClient {
        return new SignalRClient(environment.apiUrl + url);
    }
}
