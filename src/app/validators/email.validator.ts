import { AbstractControl } from "@angular/forms";

export function NewEmailValidator(control: AbstractControl): null | object {
    if (!control.value) {
        return null;
    }

    const pattern: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid: boolean = pattern.test(control.value);

    return valid ? null : { pattern: true };
}