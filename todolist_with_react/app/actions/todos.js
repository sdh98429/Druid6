import * as types from '../constants/ActionTypes';

export function addTodo(text) {
  return { type: types.ADD_TODO, text };
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id };
}

export function editTodo(id, text) {
  return { type: types.EDIT_TODO, id, text };
}

export function completeTodo(id) {
  return { type: types.COMPLETE_TODO, id };
}

export function completeAll() {
  return { type: types.COMPLETE_ALL };
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED };
}

export function callSshAction(command, ip, port, user, pass, key) {
  return dispatch => { 
    SecureShell.sshCommand(command, ip, port, user, pass, key) {
      SecureShell.sshEmitter.on('data', data => {
        dispatch(updateDataStream(data));
      }).on('stderr', data => {
        console.log(`Execute ERR: ${data.toString()}`);
      }).on('error', error => {
        dispatch(errorAction(error));
        reject(error);
      })
    }
  }
}
