import { Injectable } from '@angular/core';
import { environment } from '@env';
import { SignalRClient } from '../clients';

@Injectable()
export class SignalRService {
    public createClient(url: string): SignalRClient {
        return new SignalRClient(environment.apiUrl + url);
    }
}
