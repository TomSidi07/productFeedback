export class CommentView {
    constructor() {
        this.replyMode()
        this.generateReplyCommand()
    }
    replyMode() { }
    generateReplyCommand() {
        console.log("generate reply command")
    }
}
export default new CommentView()
