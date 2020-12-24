import { Alert } from 'react-native'
import axios from 'axios'

const basePath = 'http://18.188.122.22:8001/users'

const registrar = {
    add: (data) => {
        return axios.post(basePath, data).then(response => {
            console.log(response);
            Alert.alert('', 'Usuário registrado com sucesso.', [{ texto: 'OK'}], { cancelable: false });
            return 'OK'
        }).catch(err => {
            console.log(err)
            Alert.alert('', 'Ocorreu erro ao registrar o usuário.', [{ texto: 'OK'}], { cancelable: false });
            return 'ERROR'
        })
    }
}

export default registrar