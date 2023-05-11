import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sales-forecast',
  templateUrl: './sales-forecast.component.html',
  styleUrls: ['./sales-forecast.component.css'],
  providers: [AuthGuard, DatePipe]
})
export class SalesForecastComponent implements OnInit {
  externalFiles: File[] = [];
  loginForm!: FormGroup;
  data: any;
  options: any;
  lablesD: any;
  pricesR: any;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private authService: AuthService,
    // private router: Router
  ) { }
  fromYYMM = Date;
  toYYMM = Date;
  selectedFile!: File;
  public onSelectImage(evt: any) {
    this.selectedFile = evt[0];
 }
  // onSelectImage(event: any) {
  //   this.selectedFile = event.files[0];
  // }

  // onFileSelect(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  ngOnInit() {
    this.loginForm = this.fb.group({
      fromDate: [Date, Validators.required],
      toDate: [Date, Validators.required]
    });


    // this.data = {
    //   labels: this.lablesD,//['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01', '2022-06-01'],
    //   datasets: [
    //     {
    //       label: 'Sales Data',
    //       data: this.pricesR,//[10, 20, 30, 25, 40, 35],
    //       fill: false,
    //       borderColor: '#42A5F5'
    //     }
    //   ]
    // };
    // this.options = {
    //   legend: {
    //     display: true
    //   },
    //   scales: {
    //     xAxes: [{
    //       type: 'time',
    //       time: {
    //         unit: 'month',
    //         displayFormats: {
    //           month: 'MMM'
    //         }
    //       },
    //       ticks: {
    //         autoSkip: true,
    //         maxTicksLimit: 12
    //       }
    //     }],
    //     yAxes: [{
    //       ticks: {
    //         beginAtZero: true
    //       }
    //     }]
    //   },
    //   tooltips: {
    //     mode: 'index',
    //     intersect: false,
    //     callbacks: {
    //       label: function(tooltipItem: { datasetIndex: string | number; yLabel: any; } , data: { datasets: { [x: string]: { label: string; }; }; }) {
    //         var label = data.datasets[tooltipItem.datasetIndex].label || '';
    //         if (label) {
    //           label += ': ';
    //         }
    //         label += tooltipItem.yLabel;
    //         return label;
    //       },
    //       title: function(tooltipItem: { xLabel: string | number | Date; }[], data: any) {
    //         return new Date(tooltipItem[0].xLabel).toLocaleDateString();
    //       }
    //     },
    //     displayColors: false
    //   }
    // };
  }
  onSubmit() {
    const fromD = this.datePipe.transform( this.loginForm.value.fromDate, 'MM yyyy');//(this.loginForm.value.email);
    const toD = this.datePipe.transform( this.loginForm.value.toDate, 'MM yyyy');
    const formData = new FormData();
    console.log(fromD, toD);
    formData.append('file', this.selectedFile);
    if (fromD) {
      formData.append('fromD', fromD);
    }
    if (toD) {
      formData.append('toD', toD);
    }
    this.authService.predict(formData).subscribe((jsonData) => {
      this.lablesD = jsonData.date;
      console.log(this.lablesD)
      this.pricesR = jsonData.price;
      console.log(this.pricesR)
      this.data = {
        labels: this.lablesD,
        datasets: [
          {
            label: 'Prices',
            data: this.pricesR,
            fill: false,
            borderColor: '#2563EB'
          }
        ]
      };
      // this.options = {
      //   legend: {
      //     display: true
      //   },
      //   scales: {
      //     xAxes: [{
      //       type: 'time',
      //       time: {
      //         unit: 'month',
      //         displayFormats: {
      //           month: 'MMM YYYY'
      //         }
      //       },
      //       ticks: {
      //         autoSkip: true,
      //         maxTicksLimit: 12
      //       }
      //     }],
      //     yAxes: [{
      //       ticks: {
      //         beginAtZero: true
      //       }
      //     }]
      //   },
      //   tooltips: {
      //     mode: 'index',
      //     intersect: false,
      //     callbacks: {
      //       label: function(tooltipItem: { datasetIndex: string | number; yLabel: any; } , data: { datasets: { [x: string]: { label: string; }; }; }) {
      //         var label = data.datasets[tooltipItem.datasetIndex].label || '';
      //         if (label) {
      //           label += ': ';
      //         }
      //         label += tooltipItem.yLabel;
      //         return label;
      //       },
      //       title: function(tooltipItem: { xLabel: string | number | Date; }[], data: any) {
      //         return new Date(tooltipItem[0].xLabel).toLocaleDateString();
      //       }
      //     },
      //     displayColors: false
      //   }
      // };
      this.options = {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'month',
                displayFormats: {
                  month: 'MMM YYYY'
                }
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 12
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: false
              }
            }]
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(tooltipItem: { datasetIndex: string | number; yLabel: any; } , data: { datasets: { [x: string]: { label: string; }; }; }) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';
                if (label) {
                  label += ': ';
                }
                label += tooltipItem.yLabel;
                return label;
              },
              title: function(tooltipItem: { xLabel: string | number | Date; }[], data: any) {
                return new Date(tooltipItem[0].xLabel).toLocaleDateString();
              }
            },
            displayColors: false
          }
        };

    },//);,
    err => {
        // show signup form if user not already registered
        if (err.status === 404) {
          // this.sihowSignup = true;
          // this.router.navigate(['/sales-forecast']);
          // this.lognForm.addControl('name', this.fb.control('', Validators.required));
        }
      }
    );
  }
}
