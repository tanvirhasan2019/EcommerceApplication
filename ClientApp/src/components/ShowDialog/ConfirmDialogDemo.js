import React, { Component } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export class ConfirmDialogDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.accept = this.accept.bind(this);
        this.reject = this.reject.bind(this);
        this.confirm1 = this.confirm1.bind(this);
        this.confirm2 = this.confirm2.bind(this);
        this.confirmPosition = this.confirmPosition.bind(this);
    }

    accept() {
        this.toast.show({ severity: 'info', summary: 'Confirmed', detail: 'accepted', life: 3000 });
        this.props.handleConfirmDeletePost();
    }

    reject() {
        this.toast.show({ severity: 'info', summary: 'Rejected', detail: 'rejected', life: 3000 });
    }

    confirm1() {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: this.accept,
            reject: this.reject
        });
    }

    confirm2() {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: this.accept,
            reject: this.reject
        });
    }

    confirmPosition(position) {
        confirmDialog({
            message: this.props.message,
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            position,
            accept: this.accept,
            reject: this.reject
        });
    }

    render() {

        let confirm = this.props.confirm;
        
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                {confirm == 1 ? this.confirmPosition('left') : null  }
            </div>
        )
    }
}