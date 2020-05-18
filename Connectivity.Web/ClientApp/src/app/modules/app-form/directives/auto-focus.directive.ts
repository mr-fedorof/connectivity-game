import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
    private focusOnInit = true;

    constructor(
        private readonly elementRef: ElementRef
    ) {
    }

    public ngOnInit(): void {
        if (this.focusOnInit) {
            window.setTimeout(() => {
                this.elementRef.nativeElement.focus();
            });
        }
    }

    @Input() public set appAutofocus(condition: boolean) {
        this.focusOnInit = (condition === undefined || condition === null || !!condition);
    }
}
