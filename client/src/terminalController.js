import ComponentsBuilder from './components.js'
export default class TerminalController {

  constructor() {}



  #onInputReceived(eventEmitter) {
    const oi = this.#emitMessage;

    return function () {
      const message = this.getValue()
      this.clearValue()
      oi(eventEmitter, {userName: 'breno', message}) 
    }
  }

  #onMessageReceived({ screen, chat }) {
    return msg => {
      const { userName, message } = msg
      chat.addItem(`{bold}${userName}{/}: ${message}`)
      screen.render()
      
    }
  }

  #emitMessage(eventEmitter, msg) {
    eventEmitter.emit('message:received', msg)
  }

  #registerEvents(eventEmitter, components) {
    eventEmitter.on('message:received', this.#onMessageReceived(components))
  }

  async initializeTable (eventEmitter) {
    const components = new ComponentsBuilder()
      .setScreen({ title: 'Pure-Chat - Breno Xavier' })
      .setLayoutComponent()
      .setInputComponent(this.#onInputReceived(eventEmitter))
      .setChatComponent()
      .build()

    components.input.focus()
    components.screen.render()
    
    this.#registerEvents(eventEmitter, components)
  }
} 