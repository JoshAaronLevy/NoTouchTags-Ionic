import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';

@Component({
  selector: 'app-scan-nfc-tag',
  templateUrl: './scan-nfc-tag.page.html',
  styleUrls: ['./scan-nfc-tag.page.scss'],
  providers: [
    NFC,
    Ndef
  ]
})
export class ScanNFCTagPage implements OnInit {
  readerMode$: any;
  previousRoute: string;

  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    public router: Router
  ) { }

  async ngOnInit() {
    this.previousRoute = localStorage.getItem('previousRoute');
    this.previousRoute = `/${this.previousRoute}`;
    const flags = this.nfc.FLAG_READER_NFC_A || this.nfc.FLAG_READER_NFC_V;
    // tslint:disable-next-line: deprecation
    this.readerMode$ = this.nfc.readerMode(flags).subscribe(
      tag => console.log(JSON.stringify(tag)),
      err => console.log('Error reading tag', err)
    );

    // Read NFC Tag - iOS
    // On iOS, a NFC reader session takes control from your app while scanning tags then returns a tag
    try {
      const tag = await this.nfc.scanNdef();
      console.log(JSON.stringify(tag));
    } catch (err) {
      console.log('Error reading tag', err);
    }
  }

  routeToTags() {
    this.router.navigate(['/tags']);
  }

  routeToSettings() {
    this.router.navigate(['/settings']);
  }
}
