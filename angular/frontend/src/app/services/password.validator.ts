// password.validator.ts

import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class PasswordValidator {

    public static strong(control: FormControl): ValidationResult {
        const hasNumber = /\d/.test(control.value);
        const hasUpper = /[A-Z]/.test(control.value);
        const hasLower = /[a-z]/.test(control.value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);

        const valid = hasNumber && hasUpper && hasLower && hasSpecial;
        if (!valid) {
            // return what's not valid
            return { strong: true };
        }
        return null;
    }
}
