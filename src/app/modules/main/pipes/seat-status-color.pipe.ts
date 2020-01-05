import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'seatStatusColor'
})
export class SeatStatusColorPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        if (value === '有') {
            return '<font color="#26a306">有</font>';
        }
        return value && '<font color="#999">' + value + '</font>';
    }

}
