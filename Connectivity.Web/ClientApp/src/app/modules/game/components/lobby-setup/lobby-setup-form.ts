import { AppFormGroup, AppFormControl, AppFormArray } from '@modules/app-form/models';
import { takeUntil } from 'rxjs/operators';

export class LobbySetupForm extends AppFormGroup {
    public get name(): AppFormControl {
        return <AppFormControl>this.controls.name;
    }

    public get teamCount(): AppFormControl {
        return <AppFormControl>this.controls.teamCount;
    }

    public get teams(): AppFormArray {
        return <AppFormArray>this.controls.teams;
    }

    constructor() {
        super({});

        this.addControls({
            name: new AppFormControl(
                'Name',
                '',
                null,
                null,
                null,
                {
                    required: true,
                    maxLength: 25
                }
            ),
            teamCount: new AppFormControl(null, 2),
            teams: new AppFormArray(
                '',
                [
                    this.createTeamControl(1),
                    this.createTeamControl(2),
                ]
            )
        });

        this.teamCount.valueChanges
            .pipe(takeUntil(this.onDestroy))
            .subscribe((newTeamCount: number) => {
                const teamCount = this.teams.controls.length;
                const length = Math.max(teamCount, newTeamCount);

                for (let i = 0; i < length; i++) {
                    if (i >= teamCount) {
                        this.teams.push(this.createTeamControl(i + 1));
                    } else if (i >= newTeamCount) {
                        this.teams.removeAt(i);
                    }
                }
            });
    }

    private createTeamControl(teamNumber: number): AppFormControl {
        const teamControl = new AppFormControl(
            `Team ${teamNumber} name`,
            '',
            null,
            null,
            null,
            {
                required: true,
                maxLength: 25
            }
        );

        return teamControl;
    }
}
