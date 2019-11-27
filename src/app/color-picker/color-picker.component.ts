import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClothesService } from '../clothes.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {
  @Input() heading: string;
  @Input() color: string;
  @Output() event: EventEmitter<string> = new EventEmitter<string>();
  public defaultColors: any[] = [];
  public Colors: any[];
  public tags: any[] = [];
  public names: any[] = [];
  public show = false;
  combine: any = [];
  public c: any;
  public Sectags: any[] = [];
  public Secnames: any[] = [];
  public SecColors: any[];
  // public defaultColors: string[] = [
  //   'Null',
  //   '#fdbabc',
  //   '#fc686d',
  //   '#fb0007',
  //   '#940003',
  //   '#470101',
  //   '#feddbc',
  //   '#fdb36d',
  //   '#fc6b08',
  //   '#943e03',
  //   '#451d01',
  //   '#ffffbc',
  //   '#ffff6e',
  //   '#ffff0a',
  //   '#969905',
  //   '#464701',
  //   '#deffbc',
  //   '#b5ff6d',
  //   '#72ff08',
  //   '#439a03',
  //   '#1f4701',
  //   '#beffbc',
  //   '#73ff6d',
  //   '#22ff06',
  //   '#149b02',
  //   '#0a4801',
  //   '#beffdd',
  //   '#72ffb2',
  //   '#22ff6d',
  //   '#149a40',
  //   '#0a471e',
  //   '#beffff',
  //   '#48a2a0',
  //   '#21ffff',
  //   '#139896',
  //   '#094645',
  //   '#bddcff',
  //   '#6fb1ff',
  //   '#0b65ff',
  //   '#063c96',
  //   '#011b45',
  //   '#bcb9ff',
  //   '#6c65ff',
  //   '#0000ff',
  //   '#000096',
  //   '#000045',
  //   '#dcb8ff',
  //   '#b163ff',
  //   '#6b00ff',
  //   '#3f0096',
  //   '#1d0045',
  //   '#fdb8ff',
  //   '#fc60ff',
  //   '#fb00ff',
  //   '#940096',
  //   '#440045',
  //   '#fdb9dd',
  //   '#fc65b3',
  //   '#fb006c',
  //   '#940040',
  //   '#45011d',
  //   '#000000',
  //   // -----grey--------
  //   '#080808',
  //   '#181818',
  //   '#282828',
  //   '#383838',
  //   '#484848',
  //   '#787878',
  //   '#989898',
  //   '#B0B0B0',
  //   '#C8C8C8',
  //   '#D3D3D3',
  //   '#E0E0E0',
  //   '#F0F0F0',
  //   '#F8F8F8',
  //   '#ffffff',
  //   // -----------
  // ];

  constructor(public paneldetail: ClothesService) {
    this.getClothdetails();
  }

  getClothdetails() {

    this.paneldetail.getdetails().subscribe((res) => {
      this.Colors = res.data.colors;
      // console.log(res.data.colors.colorTag)
      // console.log( this.Colors)
      for (var key in this.Colors) {
        this.defaultColors.push(this.Colors[key].hex);
      }
      for (var i in this.Colors) {
        this.tags.push(this.Colors[i].colorTag);
      }
      for (var j in this.Colors) {
        this.names.push(this.Colors[j].name);
      }
       console.log(this.names);
    });

  }
  /**
   * Change color from default colors
   * @param {string} color
   */
  public changeColor(color: string): void {
    this.color = color;
    this.event.emit(this.color);
    this.show = false;
    if(localStorage.getItem('SC') != 'SC'){
    for (var id in this.defaultColors) {
      if (this.color == this.defaultColors[id]) {
        // console.log(this.tags[id]);
        localStorage.setItem('Ctag', this.tags[id]);
        localStorage.setItem('Cname', this.names[id]);
        this.c = this.names[id];
      }
    }}
    if (localStorage.getItem('SC') == "SC") {
      console.log('--------------');

      this.SecColors = this.defaultColors;
      console.log('**',this.SecColors)
      for (var i in this.Colors) {
        this.Sectags.push(this.Colors[i].colorTag);
        console.log('**tags',this.Sectags)
      }
      for (var j in this.Colors) {
        this.Secnames.push(this.Colors[j].name);
        console.log('**name',this.Secnames)
      }
      for (var id in this.SecColors) {
       
        if (this.color == this.SecColors[id]) {
         
       console.log(this.color);
          localStorage.setItem('SeckCtag', this.Sectags[id]);
          localStorage.setItem('SecCname', this.Secnames[id]);
              this.c = this.names[id];
          //   }
          // }

        }
      }
    }
  }

  /**
   * Change color from input
   * @param {string} color
   */
   
    public changeColorManual(color: string): void {
    const isValid = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);

    if (isValid) {
      this.color = color;
      this.event.emit(this.color);
    }
  }

  /**
   * Change status of visibility to color picker
   */
  public toggleColors(): void {
    this.show = !this.show;
    // for(var id in this.combine.hex)
    // if(this.color==this.combine[id].hex){
    //   console.log(this.combine[id].tag)

    // }
  }
}
