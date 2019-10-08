import { Dimensions } from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import DrawerContentComponents from "./components/DrawerContentComponents";
import Feed from "./screens/Feed";
import MeusDados from "./screens/MeusDados";
import Notificacoes from "./screens/Notificacoes";
import MinhasAvaliacoes from "./screens/MinhasAvaliacoes";
import Favoritos from "./screens/Favoritos";
import SugerirLocais from "./screens/SugerirLocais";
import Idioma from "./screens/Idioma";
import FaleConosco from "./screens/FaleConosco";
import AlterarSenha from "./screens/AlterarSenha";

import Avaliar from "./screens/Avaliar";

import RespostaSugerirLocais from "./screens/RespostaSugerirLocais";
import RespostaFaleConosco from "./screens/RespostaFaleConosco";
import Login from "./screens/Login";
import Cadastro from "./screens/Cadastro";
import RedefinicaoDeSenha from "./screens/RedefinicaoDeSenha";

import Pesquisar from "./screens/Pesquisar";
import Local from "./screens/Local";
import VerFotos from "./screens/VerFotos";

var { width } = Dimensions.get("window");

const DrawerNavigation = createDrawerNavigator(
  {
    Feed: {
      screen: Feed
    },
    MeusDados: {
      screen: MeusDados
    },
    Notificacoes: {
      screen: Notificacoes
    },
    MinhasAvaliacoes: {
      screen: MinhasAvaliacoes
    },
    Favoritos: {
      screen: Favoritos
    },
    SugerirLocais: {
      screen: SugerirLocais
    },
    Idioma: {
      screen: Idioma
    },
    FaleConosco: {
      screen: FaleConosco
    },
    AlterarSenha: {
      screen: AlterarSenha
    },
    Pesquisar: {
      screen: Pesquisar
    },
    Local: {
      screen: Local
    },
    VerFotos: {
      screen: VerFotos
    }
  },
  {
    drawerWidth: width,
    contentComponent: DrawerContentComponents
  }
);

const ModalNavigator = createStackNavigator(
  {
    Drawer: {
      screen: DrawerNavigation
    },
    RespostaSugerirLocais: {
      screen: RespostaSugerirLocais
    },
    RespostaFaleConosco: {
      screen: RespostaFaleConosco
    },
    Avaliar: {
      screen: Avaliar
    },
    Login: {
      screen: Login
    },
    Cadastro: {
      screen: Cadastro
    },
    RedefinicaoDeSenha: {
      screen: RedefinicaoDeSenha
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    initialRouteName: "Login"
  }
);

const App = createAppContainer(ModalNavigator);

export default App;
