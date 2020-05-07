import { AppFormControl, AppFormGroup } from '@modules/app-form/models';

export class PlayerIdentificationForm extends AppFormGroup {
    public get name(): AppFormControl {
        return this.controls.name as AppFormControl;
    }

    constructor() {
        super({});

        this.addControls({
            name: new AppFormControl(
                '',
                null,
                null,
                {
                    required: 'PLAYER_IDENTIFICATION.NAME_REQUIRED'
                },
                {
                    required: true,
                    maxLength: 25
                }
            )
        });
    }
}
