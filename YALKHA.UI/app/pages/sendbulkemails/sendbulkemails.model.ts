import { SelectItem } from 'primeng/api';

export class SendBulkEmailModel {
    FromEmail: string;
    ToEmail: string;
    SenderName: string;
    EmailSubject: string;
    EmailBody: string;
    MailPriority: string;
    SleepTimer: string;
    ToEmailList: SelectItem[];
    MailPriorityList: SelectItem[];
    SleepTimerList: SelectItem[];
    ResponseMessage: string;
    Password: string;
    constructor() {
        this.MailPriorityList = [
            { label: 'High', value: 'High' },
            { label: 'Normal', value: 'Normal' },
            { label: 'Low', value: 'Low' }
        ];
        this.SleepTimerList = [
            { label: 'Slip 1s', value: '1' },
            { label: 'Slip 2s', value: '2' },
            { label: 'Slip 3s', value: '3' },
            { label: 'Slip 5s', value: '5' },
            { label: 'Slip 8s', value: '8' },
            { label: 'Slip 10s', value: '10' },
            { label: 'Slip 30s', value: '30' },
            { label: 'Slip 60s', value: '60' },
            { label: 'Slip 90s', value: '90' },
            { label: 'Slip 120s', value: '120' },
            { label: 'Slip 150s', value: '150' },
            { label: 'Slip 180s', value: '180' },
            { label: 'Slip 300s', value: '300' },
            { label: 'Slip 500s', value: '500' },
            { label: 'Slip 800s', value: '800' },
            { label: 'Slip 1000s', value: '1000' },
        ];
    }

    public static mapFromDto(dto: any): SendBulkEmailModel {
        var model = new SendBulkEmailModel();

        model.FromEmail = dto.FromEmail;
        model.ToEmail = dto.ToEmail;
        model.SenderName = dto.SenderName;
        model.EmailSubject = dto.EmailSubject;
        model.EmailBody = dto.EmailBody;
        model.MailPriority = dto.MailPriority;
        model.SleepTimer = dto.SleepTimer;
        model.Password = dto.Password;
        // model.ToEmailList = dto.ToEmailList;
        // model.MailPriorityList = dto.MailPriorityList;
        // model.SleepTimerList = dto.SleepTimerList;
        model.ResponseMessage = dto.ExceptionMessage;

        return model;
    }

    mapToDto(): any {
        var sendbulkemailDto: any = {};
        sendbulkemailDto.FromEmail = this.FromEmail;
        sendbulkemailDto.ToEmail = this.ToEmail;
        sendbulkemailDto.SenderName = this.SenderName;
        sendbulkemailDto.EmailSubject = this.EmailSubject;
        sendbulkemailDto.EmailBody = this.EmailBody;
        sendbulkemailDto.MailPriority = this.MailPriority;
        sendbulkemailDto.SleepTimer = this.SleepTimer;
        sendbulkemailDto.Password = this.Password;
        // sendbulkemailDto.ToEmailList = this.ToEmailList;
        // sendbulkemailDto.MailPriorityList = this.MailPriorityList;
        // sendbulkemailDto.SleepTimerList = this.SleepTimerList;
        sendbulkemailDto.ResponseMessage = this.ResponseMessage;

        return sendbulkemailDto;
    }

    reset() {
        this.FromEmail = undefined;
        this.ToEmail = undefined;
        this.SenderName = undefined;
        this.EmailSubject = undefined;
        this.EmailBody = undefined;
        this.MailPriority = undefined;
        this.SleepTimer = undefined;
        this.Password = undefined;
        this.ResponseMessage = undefined;
    }
}
