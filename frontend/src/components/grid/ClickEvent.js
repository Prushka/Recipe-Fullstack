
export class ClickEvent {
    constructor(header, value, id, cellId, isHeader, entity) {
        this.header = header
        this.value = value
        this.id = id
        this.cellId = cellId
        this.isHeader = isHeader
        this.entity = entity
    }
}
