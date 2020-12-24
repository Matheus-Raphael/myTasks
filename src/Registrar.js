import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { GlobalStyles } from './styles/GlobalStyles'
import service from './service/registerUser'

export default function Registrar({ navigation }) {
    const [data, setData] = useState({ nome: '', email: '', senha: '', confirmaSenha: '' })

    const field = (field) => {
        return (value) => setData({...data, [field]: value })
    }

    const doRegisterUser = async () => {

        if (data.nome == '' || data.email == '' || data.senha == '' || data.confirmaSenha == '') {
            Alert.alert('', 'Preencha todos os campos', [{ texto: 'OK'}], { cancelable: false });
            return;
        }

        if (data.senha != data.confirmaSenha) {
            Alert.alert('', 'A confirmação de senha não confere.', [{ texto: 'OK'}], { cancelable: false });
            return;
        }

        const dados = {
            name: data.nome,
            email: data.email,
            password: data.senha
        }

        let result = await service.add(dados)
        if (result === 'OK') {
            setData({ nome: '', email: '', senha: '', confirmaSenha: '' });
            navigation.navigate('Login');
        }
    }

    return (
        <React.Fragment>
            <View style={GlobalStyles.container}>
                {/* <Text style={styles.tituloText}>Registre-se</Text> */}

                <TextInput placeholder="Nome" 
                    style={GlobalStyles.input}
                    onChangeText={field('nome')}
                    value={data.nome} />

                <TextInput placeholder="E-mail"
                    style={GlobalStyles.input} 
                    keyboardType="email-address"
                    onChangeText={field('email')}
                    value={data.email} />

                <TextInput placeholder="Senha" 
                    style={GlobalStyles.input}
                    secureTextEntry={true}
                    onChangeText={field('senha')}
                    value={data.senha} />

                <TextInput placeholder="Confirmar senha"
                    style={GlobalStyles.input}
                    secureTextEntry={true}
                    onChangeText={field('confirmaSenha')}
                    value={data.confirmaSenha} />

                <TouchableOpacity style={styles.btnRegistrar}
                    onPress={doRegisterUser}>
                    <Text style={styles.btnRegistrarText}>Registrar</Text>
                </TouchableOpacity>

                {/* <View style={styles.buttons}>
                    <TouchableOpacity style={styles.btnCancelar} onPress={() => navigation.goBack()}>
                        <Text style={styles.btnCancelarText}>Cancelar</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    tituloText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        padding: 20
    },
    // buttons: {
    //     marginTop: 15
    // },
    btnRegistrar: {
        backgroundColor: '#059669',
        width: '90%',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        borderRadius: 5
    },
    btnRegistrarText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#D1FAE5'
    },
    // btnCancelar: {
    //     backgroundColor: '#059669',
    //     width: '40%',
    //     alignItems: 'center',
    //     padding: 10,
    //     marginTop: 10,
    //     borderRadius: 5
    // },
    // btnCancelarText: {
    //     fontSize: 14,
    //     fontWeight: '500',
    //     color: '#D1FAE5'
    // }
})
