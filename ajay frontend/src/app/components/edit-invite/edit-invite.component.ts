import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Channels } from 'src/app/channels';
import { Invite } from 'src/app/invites';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-edit-invite',
  templateUrl: './edit-invite.component.html',
  styleUrls: ['./edit-invite.component.css']
})

export class EditInviteComponent implements OnInit {
  @Output() onCreateInvite: EventEmitter<Invite> = new EventEmitter<Invite>();
  @Output() onUpdateInvite: EventEmitter<Invite> = new EventEmitter<Invite>();
  @Input() inviteId!: string;
  @Input() inviteDetails!: Invite;
  channels: Channels[] = [];

  Data: Array<any> = [
    { name: 'Create', value: 'create' },
    { name: 'Edit', value: 'edit' },
    { name: 'Delete', value: 'delete' }
  ]
  form!: FormGroup;
  permissionsValues: Array<any> = [];
  channelValues: Array<any> = [];
  isUpdateForm: Boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Invite, private dashboardService: DashboardService, private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: this.fb.control('', [Validators.required]),
      userEmail: this.fb.control('', [Validators.required]),
      channelsArray: this.fb.array([], [Validators.required]),
      checkArray: this.fb.array([], [Validators.required])
    })
  }

  ngOnInit(): void {
    this.dashboardService.getChannels()
      .subscribe(response => {
        this.channels = response
      }, error => {
        console.log(error)
      })

    if (Object.keys(this.data).length !== 0) {
      const { name, email, channels, permissions } = this.data

      this.isUpdateForm = true;

      this.form = this.fb.group({
        fullName: this.fb.control(name, [Validators.required]),
        userEmail: this.fb.control(email, [Validators.required]),
        channelsArray: this.fb.array(channels.map(val => val._id), [Validators.required]),
        checkArray: this.fb.array(permissions, [Validators.required])
      })

      this.channelValues = this.form.value.channelsArray
      this.permissionsValues = this.form.value.checkArray
    }
  }

  onChannelsChange(e: any) {
    const channelsArray: FormArray = this.form.get('channelsArray') as FormArray;
    if (e.target.checked) {
      channelsArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      channelsArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          channelsArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onPermissionsChange(e: any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {

    if (this.isUpdateForm) {
      console.log('Update form')
      const invite = {
        _id: this.data._id,
        name: this.form.value.fullName,
        email: this.form.value.userEmail,
        channels: this.form.value.channelsArray,
        permissions: this.form.value.checkArray
      }

      console.log('Update Form Values', invite)

      this.onUpdateInvite.emit(invite)
      return;
    }

    console.log('create form')

    const invite = {
      name: this.form.value.fullName,
      email: this.form.value.userEmail,
      channels: this.form.value.channelsArray,
      permissions: this.form.value.checkArray
    }

    this.onCreateInvite.emit(invite)

    this.form.reset()
  }
}
