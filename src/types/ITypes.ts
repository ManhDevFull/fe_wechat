export interface ChatUser {
    id: string,
    name: string,
    avt: string,
    statusFriend: boolean,
    status: boolean,
}
export interface MessageChat {
    id: string,
    content: string,
    imgs: string,
    userFrom: string,
    userTo: string,
    status: boolean,
    sendAt: string,
    readAt: string
}