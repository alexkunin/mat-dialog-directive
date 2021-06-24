import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-directive',
  template: `
    <p>
      directive works!
    </p>
  `,
  styles: [
  ]
})
export class DirectiveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
