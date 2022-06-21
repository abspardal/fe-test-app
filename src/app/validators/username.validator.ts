import { AbstractControl } from "@angular/forms";

export function UsernameValidator(control: AbstractControl): null | object {
    if (!control.value) {
        return null;
    }

    const pattern = /[!\[\]{}".]/;
    const valid: boolean = pattern.test(control.value);

    return !valid ? null : { pattern: true };
}