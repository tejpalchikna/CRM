import { Injector, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pipeExecutor' })
export class PipeExecutorPipe implements PipeTransform {
    constructor(private injector: Injector) { }

    transform(value: any, pipeToken: PipeTransform, pipeArgs: any[]): any {
        if (!pipeToken) {
            return value;
        }
        let pipe = this.injector.get(pipeToken);
        return pipe.transform(value, pipeArgs);
    }
}