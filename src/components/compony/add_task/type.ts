export interface TaskForm {
    task_id?: number;
    time: string;
    stage: string;
    contact_id: number;
    user_id: number;
    remark: string;
    contact_information: string;
    state: 0 | 1;
}
