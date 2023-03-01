import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component
} from '@angular/core';
import { each, find, includes } from 'lodash-es';
import { DROPDOWN_ACCURATE_SELECTION, DROPDOWN_ITEMS } from '../../constants/dropdown.constants';
import { ControlerBase } from '../base/controler-base';
import { commentHandler } from '../base/helper-class';
import { controlType } from '../Interface/tab-data-model';

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownComponent extends ControlerBase {
    public tabIndex = 0;
    public name = '';
    public listerning = false;
    public type = 'dropdown';
    public message = '';
    public previousFinalData = '';
    public command = 'command';
    public selectedOption = '';
    public speechReceived = '';
    public demoItem = DROPDOWN_ITEMS;
    public controlType = controlType.dropdown;
    constructor(
        private refInt: ChangeDetectorRef
    ) {
        super(refInt);
    }
    protected localCommandHandler(message: string) {
        this.speechReceived = message;
        message = message.replace(/\s/g, '').toLowerCase();
        each(DROPDOWN_ACCURATE_SELECTION, (value, key) => {
            if (includes(value, message)) {
                message = key;
                return false;
            }
            return true;
        })
        this.selectedOption = find(this.demoItem, { value: message }) ? message : '';
        this.ref.detectChanges();
    }
}
