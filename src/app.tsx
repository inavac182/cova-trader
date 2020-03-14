import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './less/main.less'
import { HomePage } from './components'

ReactDOM.render(<HomePage message={'Hello'} />, document.getElementById('main'))
