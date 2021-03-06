import React, { useState, useContext, useEffect } from 'react'
import { Image, ScrollView, TouchableOpacity, StatusBar, View, Text, TextInput, StyleSheet, ActivityIndicator, Button } from 'react-native'
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, bright, H, primary, StatusBarHeight, _grey } from '../../constants/constants'
import isEmail from 'validator/lib/isEmail';
import { Context as AuthContext } from '../../context/AppContext';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';

const ForgotPasswordScreen = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [showActivityIndicator, setshowActivityIndicator] = useState(false);
    const { state, forgotPassword, clearErrorMessage } = useContext(AuthContext);

    useEffect(()=>{
        const unSubscribe = navigation.addListener('focus', ()=>{
            clearErrorMessage();
        });

        return unSubscribe
    }, [navigation])


    return (
        <ScrollView style={{ backgroundColor: APP_BACKGROUND_COLOR}}>
            <StatusBar
                animated={true}
                backgroundColor={APP_BACKGROUND_COLOR}
            />
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 5, paddingRight: 10 }}>
                    <Image source={require('../../../assets/arrow-left.png')} style={{ height: 35, width: 35, tintColor: APP_WHITE_COLOR }} />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: H * .05, width: '85%' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: APP_ORANGE_COLOR }}>Reset Password</Text>
                <Text style={{ fontSize: 13, color: APP_WHITE_COLOR, marginTop: 10 }}>Send the email address associated to this account and we will send you instructions to reset your password</Text>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: H * .05 }}>

                <View style={[styles.input_vw, { borderColor: isEmail(email) || email.length === 0 ? '#fff' : 'red', borderWidth: 1 }]}>
                    <TextInput
                        style={styles.txt_input}
                        placeholder="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>

                <TouchableOpacity
                    style={{ backgroundColor: APP_ORANGE_COLOR, height: 45, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => forgotPassword({ email, setshowActivityIndicator }, () => navigation.navigate("OtpVerfication"))}
                >
                    <Text style={{ color: bright, fontSize: 16 }}>Send Instructions</Text>
                </TouchableOpacity>
                <View style={{ marginBottom: H * .1 }} />

            </View>

            {showActivityIndicator ? <AppActivityIndictor/> : null}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    input_vw: {
        backgroundColor: '#ebebeb',
        flexDirection: 'row',
        height: 43,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15
    },
    txt_input: {
        flex: 1,
        fontSize: 16
    }
});


export default ForgotPasswordScreen
