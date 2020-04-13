import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { validateForm } from '@modules/app-form/helpers';
import { joinPlayerAction } from '@modules/game/actions/player.actions';
import { Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { PlayerIdentificationForm } from './player-identification-form';

@Component({
  selector: 'app-player-identification',
  templateUrl: './player-identification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerIdentificationComponent extends DestroyableComponent implements OnInit, OnDestroy {
  public form: PlayerIdentificationForm;

  constructor(
      private readonly store: Store
  ) {
      super();
  }

  public ngOnInit(): void {
      this.form = new PlayerIdentificationForm();
  }

  public ngOnDestroy(): void {
      super.ngOnDestroy();
      this.form.destroy();
  }

  public onFormSubmit(): void {
      if (validateForm(this.form)) {
          this.store.dispatch(joinPlayerAction(this.form.name.value));
      }
  }
}
