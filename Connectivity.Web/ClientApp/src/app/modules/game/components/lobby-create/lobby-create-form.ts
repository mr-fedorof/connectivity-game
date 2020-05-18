import { AppFormArray, AppFormControl, AppFormGroup } from '@modules/app-form/models';
import { takeUntil } from 'rxjs/operators';

export class LobbyCreateForm extends AppFormGroup {
    public get name(): AppFormControl {
        return this.controls.name as AppFormControl;
    }

    public get teamCount(): AppFormControl {
        return this.controls.teamCount as AppFormControl;
    }

    public get teams(): AppFormArray {
        return this.controls.teams as AppFormArray;
    }

    constructor() {
        super({});

        this.addControls({
            name: new AppFormControl(
                '',
                null,
                null,
                {
                    required: 'LOBBY_CREATE.NAME_LABEL_REQUIRED',
                },
                {
                    required: true,
                    maxLength: 25,
                }
            ),
            teamCount: new AppFormControl(2),
            teams: new AppFormArray(
                [
                    this.createTeamControl(1),
                    this.createTeamControl(2),
                ]
            ),
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
            '',
            null,
            null,
            {
                required: 'LOBBY_CREATE.TEAM_NAME_LABEL_REQUIRED',
            },
            {
                required: true,
                maxLength: 25,
            }
        );

        return teamControl;
    }
}
