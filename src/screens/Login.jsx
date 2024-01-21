import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Input from "../components/Input.jsx";
import { colors } from "../global/colors.js";
import { useLogInMutation } from "../services/authServices.js";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice.js";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //tiene mas metodos para los errores ...
  /* const [triggerLogIn, isError, isLoading, isSuccess, error, result] =
    useLogInMutation(); */

  const [triggerLogIn, result] = useLogInMutation();

  const onSubmit = async () => {
    try {
      await triggerLogIn({ email, password });
      console.log("Inicio de sesión exitoso");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (result.data) {
      dispatch(setUser(result.data));
    }
  }, [result]);

  return (
    <View style={styles.container}>
      <Input label="Email" onChange={setEmail} />
      <Input label="Contraseña" onChange={setPassword} isSecureEntry={true} />
      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>Ingresar</Text>
      </TouchableOpacity>
      <View style={styles.altContainer}>
        <Text style={styles.subtitle}>¿No tienes cuenta?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.subtitleLink}>Crear una</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  btn: {
    padding: 10,
    backgroundColor: "#cbd5e1",
    borderRadius: 8,
    margin: 5,
  },
  btnText: {
    color: "#020617",
    fontFamily: colors.fonts.secondary,
  },
  altContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  subtitle: {
    color: "#020617",
    fontFamily: colors.fonts.secondary,
    fontSize: 14,
  },
  subtitleLink: {
    fontFamily: colors.fonts.primary,
    color: "#020617",
    fontSize: 11,
    textDecorationLine: "underline",
  },
});
