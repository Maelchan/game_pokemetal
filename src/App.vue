<template>
  <div id="app">
    <!--START GAME PART-->
    <div v-if="startGame" key="game-part">
      <header>
        <h1>{{ title }}</h1>
        <p>{{ consigne }}</p>
      </header>
      <main>
        <div class="name" v-if="showButtons">
          <h2>{{ name | uppercase }}</h2>
        </div>
        <div class="result" v-if="btnClicked">
          <h3 :class="{ success: success, error: !success }">
            {{ result }}
          </h3>
          <p>{{ description }}</p>
        </div>
        <!--Affichage des boutons pour choisir -->
        <div class="choice" v-if="showButtons">
          <button class="poke" :disabled="btnClicked" v-on:click="pokemon">
            <v-icon name="gamepad" />
            POKEMON
          </button>
          <button class="metal" :disabled="btnClicked" v-on:click="metal">
            <v-icon name="beer" />
            METAL
          </button>
        </div>
        <!--Affichage du bouton de génération de nom-->
        <div class="generate">
          <button class="start" @click="displayName">
            {{ textButton }}
            <v-icon v-if="showButtons" name="arrow-right" />
          </button>
        </div>
      </main>
      <footer>
        <div class="score">
          <p>
            Gagné :
            <span>{{ points }}</span>
            - Perdu
            <span>{{ mallus }}</span>
          </p>
          <p>{{ entry }} / 20</p>
        </div>
      </footer>
    </div>
    <!--FINISH GAME PART-->
    <div v-else key="results-part">
      <h1>Terminé</h1>
      <p>
        Vous avez fait un score de <span>{{ points }}</span> points sur 20
      </p>
      <h2>{{ niveauFinal }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      title: "Pokémon ou groupe de métal ?",
      consigne:
        "Trouves si le nom qui s'affiche appartient à un pokémon ou à un groupe de métal.",
      textButton: "GÉNÉRER UN NOM",
      bdd: [
        {
          ID: "0",
          nom: "Ocelon",
          type: "metal",
          description: "Ocelon est un groupe de Folk Metal espagnol.",
        },
        {
          ID: "1",
          nom: "Mycelia",
          type: "metal",
          description: "Mycelia est un groupe de Death Metal technique Suisse.",
        },
        {
          ID: "2",
          nom: "Vulcano",
          type: "metal",
          description:
            "Vulcano est un groupe de Metal extrême brésilien actif depuis 1981.",
        },
        {
          ID: "3",
          nom: "Frosttide",
          type: "metal",
          description: "Frosttide est un groupe de Death Metal mélodique et folk metal finlandais.",
        },
        {
          ID: "4",
          nom: "Vondur",
          type: "metal",
          description:
            "Vondur est un groupe de Black Metal suédois.",
        },
        {
          ID: "5",
          nom: "Oratoria",
          type: "pokemon",
          description:
            "Oratoria est un Pokémon de type Eau et Fée de la septième génération.",
        },
        {
          ID: "6",
          nom: "Vallorch",
          type: "metal",
          description: "Vallorch est un groupe de Folk Metal italien formé en 2010.",
        },
        {
          ID: "7",
          nom: "Drakum",
          type: "metal",
          description: "Drakum est un groupe de Folk/Death Metal catalan.",
        },
        {
          ID: "8",
          nom: "Sinistrail",
          type: "pokemon",
          description:
            "Sinistrail est un Pokémon de type Spectre et Plante de la septième génération.",
        },
        {
          ID: "9",
          nom: "Gwydion",
          type: "metal",
          description: "Gwydion est un groupe de Folk Pagan Metal originaire de Lisbonne au Portugal.",
        },
        {
          ID: "10",
          nom: "Necrozma",
          type: "pokemon",
          description:
            "Necrozma est un Pokémon légendaire de type Psy de la septième génération. Il forme le Trio Astral avec Solgaleo et Lunala.",
        },
        {
          ID: "11",
          nom: "Golgopathe",
          type: "pokemon",
          description:
            "Golgopathe est un Pokémon de type Roche et Eau de la sixième génération.",
        },
        {
          ID: "12",
          nom: "Kravarech",
          type: "pokemon",
          description:
            "Kravarech est un Pokémon de type Poison et Dragon de la sixième génération.",
        },
        {
          ID: "13",
          nom: "Gamblast",
          type: "pokemon",
          description:
            "Gamblast est un Pokémon de type Eau de la sixième génération.",
        },
        {
          ID: "14",
          nom: "Rexilius",
          type: "pokemon",
          description:
            "Rexillius est un Pokémon de type Roche et Dragon de la sixième génération et l'évolution de Ptyranidur.",
        },
        {
          ID: "15",
          nom: "Dragmara",
          type: "pokemon",
          description:
            "Dragmara est un Pokémon de type Roche et Glace de la sixième génération et l'évolution d'Amagara.",
        },
        {
          ID: "16",
          nom: "Huldre",
          type: "metal",
          description: "Huldre est un groupe de Folk Metal dannois. Le groupe s'est séparé en 2019.",
        },
        {
          ID: "17",
          nom: "Yveltal",
          type: "pokemon",
          description:
            "Yveltal est un Pokémon légendaire de type Ténèbres et Vol de la sixième génération et la mascotte de Pokémon Y.",
        },
        {
          ID: "18",
          nom: "Mushana",
          type: "pokemon",
          description:
            "Mushana est un Pokémon de type Psy de la cinquième génération.",
        },
        {
          ID: "19",
          nom: "Gigalithe",
          type: "pokemon",
          description:
            "Gigalithe est un Pokémon de type Roche de la cinquième génération.",
        },
        {
          ID: "20",
          nom: "Brutapode",
          type: "pokemon",
          description:
            "Brutapode est un Pokémon de type Insecte et Poison de la cinquième génération. ",
        },
        {
          ID: "21",
          nom: "Deoxys",
          type: "pokemon",
          description:
            "Deoxys est un Pokémon fabuleux de type Psy de la troisième génération. ",
        },
        {
          ID: "22",
          nom: "Cryptéro",
          type: "pokemon",
          description:
            "Cryptéro est un Pokémon de type Psy et Vol de la cinquième génération. ",
        },
        {
          ID: "23",
          nom: "Zoroark",
          type: "pokemon",
          description:
            "Zoroark est un Pokémon de type Ténèbres de la cinquième génération. ",
        },
        {
          ID: "24",
          nom: "Haydaim",
          type: "pokemon",
          description:
            "Haydaim est un Pokémon de type Normal et Plante de la cinquième génération.",
        },
        {
          ID: "25",
          nom: "Emolga",
          type: "pokemon",
          description:
            "Emolga est un Pokémon de type Électrik et Vol de la cinquième génération. ",
        },
        {
          ID: "26",
          nom: "Statitik",
          type: "pokemon",
          description:
            "Statitik est un Pokémon de type Insecte et Électrik de la cinquième génération. ",
        },
        {
          ID: "27",
          nom: "Grindur",
          type: "pokemon",
          description:
            "Grindur est un Pokémon de type Plante et Acier de la cinquième génération. ",
        },
        {
          ID: "28",
          nom: "Ohmassacre",
          type: "pokemon",
          description:
            "Ohmassacre est un Pokémon de type Électrik de la cinquième génération.",
        },
        {
          ID: "29",
          nom: "Mélancolux",
          type: "pokemon",
          description:
            "Mélancolux est un Pokémon de type Spectre et Feu de la cinquième génération.",
        },
        {
          ID: "30",
          nom: "Drakkarmin",
          type: "pokemon",
          description:
            "Drakkarmin est un Pokémon de type Dragon de la cinquième génération. Il est le seul Pokémon Dragon pur à n'avoir ni de pré-évolution ni d'évolution.",
        },
        {
          ID: "31",
          nom: "Diamat",
          type: "pokemon",
          description:
            "Diamat est un Pokémon de type Ténèbres et Dragon de la cinquième génération. ",
        },
        {
          ID: "32",
          nom: "Pyrax",
          type: "pokemon",
          description:
            "Pyrax est un Pokémon de type Insecte et Feu de la cinquième génération. Il est l'évolution de Pyronille.",
        },
        {
          ID: "33",
          nom: "Zekrom",
          type: "pokemon",
          description:
            "Zekrom est un Pokémon légendaire de type Dragon et Électrik de la cinquième génération. Il est la mascotte de Pokémon Blanc, associé à la symbolique du Yin, et le rival de Reshiram.",
        },
        {
          ID: "34",
          nom: "Démétéros",
          type: "pokemon",
          description:
            "Démétéros est un Pokémon légendaire de type Sol et Vol de la cinquième génération. Il forme un trio légendaire, celui des génies, avec Boréas et Fulguris. ",
        },
        {
          ID: "35",
          nom: "Charkos",
          type: "pokemon",
          description:
            "Charkos est un Pokémon de type Roche de la quatrième génération. ",
        },
        {
          ID: "36",
          nom: "Bastiodon",
          type: "pokemon",
          description:
            "Bastiodon est un Pokémon de type Roche et Acier de la quatrième génération. ",
        },
        {
          ID: "37",
          nom: "Kvelertak",
          type: "metal",
          description:
            "Kvelertak est un groupe de black 'n' roll norvégien originaire de Stavanger.",
        },
        {
          ID: "38",
          nom: "Drastique",
          type: "metal",
          description:
            "Drastique est un groupe d'avant-garde gothic métal originaire d'Italie.",
        },
        {
          ID: "39",
          nom: "Spiritomb",
          type: "pokemon",
          description:
            "Spiritomb est un Pokémon de type Spectre et Ténèbres de la quatrième génération. ",
        },
        {
          ID: "40",
          nom: "Carchacrok",
          type: "pokemon",
          description:
            "Carchacrok est un Pokémon de type Dragon et Sol de la quatrième génération. ",
        },
        {
          ID: "41",
          nom: "Drascore",
          type: "pokemon",
          description:
            "Drascore est un Pokémon de type Poison et Ténèbres de la quatrième génération.",
        },
        {
          ID: "42",
          nom: "Maganon",
          type: "pokemon",
          description:
            "Maganon est un Pokémon de type Feu de la quatrième génération. ",
        },
        {
          ID: "43",
          nom: "Noctunoir",
          type: "pokemon",
          description:
            "Noctunoir est un Pokémon de type Spectre de la quatrième génération. ",
        },
        {
          ID: "44",
          nom: "Heatran",
          type: "pokemon",
          description:
            "Heatran est un Pokémon légendaire de type Feu et Acier de la quatrième génération et est actuellement le seul Pokémon ayant ce double type.",
        },
        {
          ID: "45",
          nom: "Darkrai",
          type: "pokemon",
          description:
            "Darkrai est un Pokémon fabuleux de la quatrième génération de type Ténèbres. Il fait partie du Duo lunaire avec Cresselia. ",
        },
        {
          ID: "46",
          nom: "Arceus",
          type: "pokemon",
          description:
            "Arceus est un Pokémon fabuleux de type Normal de la quatrième génération. ",
        },
        {
          ID: "47",
          nom: "Lombre",
          type: "pokemon",
          description:
            "Lombre est un Pokémon de type Eau et Plante apparu dans la troisième génération. Il est l'évolution de Nénupiot et évolue en Ludicolo.",
        },
        {
          ID: "48",
          nom: "Maskadra",
          type: "pokemon",
          description:
            "Maskadra est un Pokémon de type Insecte et Vol apparu dans la troisième génération. Il est l'évolution d'Arakdo. ",
        },
        {
          ID: "49",
          nom: "Vigoroth",
          type: "pokemon",
          description:
            "Vigoroth est un Pokémon de type Normal apparu dans la troisième génération. Seul membre « actif » de sa famille, il est l'évolution de Parecool, et évolue lui-même en Monaflèmit. ",
        },
        {
          ID: "50",
          nom: "Galeking",
          type: "pokemon",
          description:
            "Galeking est un Pokémon de type Acier et Roche de la troisième génération. Il est l'évolution finale de Galekid et Galegon. ",
        },
        {
          ID: "51",
          nom: "Wailord",
          type: "pokemon",
          description:
            "Wailord est un Pokémon de type Eau de la troisième génération. Il est l'évolution de Wailmer. ",
        },
        {
          ID: "52",
          nom: "Frosthardr",
          type: "metal",
          description:
            "Frosthardr est un groupe de black metal chrétien norvégien, formé en 1997.",
        },
        {
          ID: "53",
          nom: "Fleurety",
          type: "metal",
          description:
            "Fleurety est un groupe d'avant-garde métal norvégien, formé en 1991.",
        },
        {
          ID: "54",
          nom: "Absol",
          type: "pokemon",
          description:
            "Absol est un Pokémon de base de type Ténèbres apparu dans la troisième génération. On dit de lui qu'il est annonciateur de désastre. ",
        },
        {
          ID: "55",
          nom: "Relicanth",
          type: "pokemon",
          description:
            "Relicanth est un Pokémon de base de type Eau et Roche apparu dans la troisième génération. Inspiré du cœlacanthe, il est comme lui un véritable fossile vivant. ",
        },
        {
          ID: "56",
          nom: "Drackhaus",
          type: "pokemon",
          description:
            "Drackhaus est un Pokémon de type Dragon de la troisième génération. ",
        },
        {
          ID: "57",
          nom: "Terhal",
          type: "pokemon",
          description:
            "Terhal est un Pokémon de type Acier et Psy de la troisième génération.",
        },
        {
          ID: "58",
          nom: "Regirock",
          type: "pokemon",
          description:
            "Regirock est un Pokémon légendaire de type Roche de la troisième génération. ",
        },
        {
          ID: "59",
          nom: "Meganium",
          type: "pokemon",
          description:
            "Méganium est un Pokémon de type Plante de la deuxième génération. Il est la dernière évolution du Pokémon de départ plante de Pokémon Or, Argent et Cristal, Germignon. ",
        },
        {
          ID: "60",
          nom: "Noarfang",
          type: "pokemon",
          description:
            "Noarfang est un Pokémon de type Normal et Vol de la deuxième génération. ",
        },
        {
          ID: "61",
          nom: "Nostenfer",
          type: "pokemon",
          description:
            "Nostenfer est un Pokémon de type Poison et Vol de la deuxième génération. ",
        },
        {
          ID: "62",
          nom: "Foretress",
          type: "pokemon",
          description:
            "Foretress est un Pokémon de type Insecte et Acier de la deuxième génération et l'évolution de Pomdepik. ",
        },
        {
          ID: "63",
          nom: "Granbull",
          type: "pokemon",
          description:
            "Granbull est un Pokémon de type Fée de la deuxième génération.",
        },
        {
          ID: "64",
          nom: "Arbok",
          type: "pokemon",
          description:
            "Arbok est un Pokémon de type Poison de la première génération. ",
        },
        {
          ID: "65",
          nom: "Kyogre",
          type: "pokemon",
          description:
            "Kyogre est un Pokémon légendaire de type Eau de la troisième génération. C'est le Pokémon emblématique de Pokémon Saphir et Pokémon Saphir Alpha. Avec Groudon et Rayquaza il est un des trois Pokémon ancestraux. ",
        },
        {
          ID: "66",
          nom: "Abigor",
          type: "metal",
          description:
            "Abigor est un groupe de Black Métal atmosphérique autrichien",
        },
        {
          ID: "67",
          nom: "Forteresse",
          type: "metal",
          description:
            "Forteresse est un groupe canadien de Black Metal, originaire de Québec.",
        },
        {
          ID: "68",
          nom: "Heretoir",
          type: "metal",
          description: "Heretoir est un groupe de Black Metal avant-gardiste allemand.",
        },
        {
          ID: "69",
          nom: "Melankoli",
          type: "metal",
          description:
            "Melankoli est un one-man band de Depressive Metal, originaire de Moscou.",
        },
        {
          ID: "70",
          nom: "Drakwald",
          type: "metal",
          description:
            "Drakwald est un groupe français de Death Metal Mélodique/Folk Metal, fondé en 2009 à Tours.",
        },
        {
          ID: "71",
          nom: "Serenius",
          type: "metal",
          description:
            "Serenius est un groupe de Death Metal Mélodique français, originaire d'Île-de-France.",
        },
        {
          ID: "72",
          nom: "Leviathan",
          type: "metal",
          description: "Leviathan est un one-man band de Black Metal américain",
        },
        {
          ID: "73",
          nom: "Agalloch",
          type: "metal",
          description:
            "Agalloch est un groupe de Black/Dark Metal américain, originaire de Portland, dans l'Oregon.",
        },
        {
          ID: "74",
          nom: "Elderwind",
          type: "metal",
          description:
            "Elderwind est un groupe de Black Metal atmosphérique originaire de Russie.",
        },
        {
          ID: "75",
          nom: "Garwall",
          type: "metal",
          description: "Garwall est un groupe de Heavy Black Metal français.",
        },
        {
          ID: "76",
          nom: "Nawather",
          type: "metal",
          description:
            "Nawather est un groupe de Metal Oriental tunisien fondé en 2013.",
        },
        {
          ID: "77",
          nom: "Monolithe",
          type: "metal",
          description: "Monolithe est un groupe de Doom Metal français.",
        },
        {
          ID: "78",
          nom: "Pillorian",
          type: "metal",
          description: "Pillorian est un groupe de Black Metal américain. Le groupe n'est plus actif depuis 2019.",
        },
        {
          ID: "79",
          nom: "Dynfari",
          type: "metal",
          description: "Dynfari est un groupe de Black Metal atmosphérique islandais, formé en 2010.",
        },
        {
          ID: "80",
          nom: "Crowbar",
          type: "metal",
          description: "Crowbar est un groupe de Doom Sludge Metal originaire de La Nouvelle-Orléans, actif depuis 1989.",
        },
        {
          ID: "81",
          nom: "Malkavian",
          type: "metal",
          description: "Malkavian est un groupe de Trash Metal français, originaire de Nantes. Il existe 2 autres groupes de Metal, d'origine italiens, qui portent le même nom.",
        },
        {
          ID: "82",
          nom: "Darkenhold",
          type: "metal",
          description: "Darkenhold est un groupe de Black Metal français, originaire de Nice.",
        },
        {
          ID: "83",
          nom: "Acherozu",
          type: "metal",
          description: "Acherozu est un groupe de Black/Trash Metal chinois.",
        },
        {
          ID: "84",
          nom: "Kroda",
          type: "metal",
          description: "Kroda est un groupe ukrainien de Black Pagan Metal formé en 2003 à Dnipro.",
        },
        {
          ID: "85",
          nom: "Spektr",
          type: "metal",
          description: "Spektr est un duo de Black Metal Ambient expérimental français, originaire de Paris.",
        },
        {
          ID: "86",
          nom: "Disma",
          type: "metal",
          description: "Disma est un groupe de Death Metal américain.",
        },
        {
          ID: "87",
          nom: "Solothus",
          type: "metal",
          description: "Solothus est un groupe de Death/Doom Metal finlandais.",
        },
        {
          ID: "88",
          nom: "Sumeragi",
          type: "metal",
          description: "Sumeragi est un groupe de Black Metal atmosphérique, originaire d'Osaka au Japon.",
        },
        {
          ID: "89",
          nom: "Valtari",
          type: "metal",
          description: "Valtari est un one-man band australien de Death Metal mélodique",
        },
        {
          ID: "90",
          nom: "Temnein",
          type: "metal",
          description: "Temnein est un groupe de Death Metal mélodique français.",
        },
        {
          ID: "91",
          nom: "Triptykon",
          type: "metal",
          description: "Triptykon est un groupe de Dark Metal originaire de Zurich en Suisse.",
        },
        {
          ID: "92",
          nom: "Fenrir",
          type: "metal",
          description: "Fenrir est un groupe de Folk Metal français, originaire de Nancy.",
        },
        {
          ID: "93",
          nom: "Mastodon",
          type: "metal",
          description: "Mastodon est un groupe de Metal Progressif originaire d'Atlanta aux USA.",
        },
        {
          ID: "94",
          nom: "Nargaroth",
          type: "metal",
          description: "Nargaroth est un groupe de Black Metal allemand.",
        },
        {
          ID: "95",
          nom: "Arkona",
          type: "metal",
          description: "Arkona est un groupe de Folk Pagan Metal originaire de Russie.",
        },
        {
          ID: "96",
          nom: "Tiamat",
          type: "metal",
          description:
            "Tiamat est un groupe de metal gothique suédois. Leur style musical est parfois classé dans le metal atmosphérique, parfois dans le metal gothique en fonction des albums.",
        },
        {
          ID: "97",
          nom: "Decipher",
          type: "metal",
          description: "Decipher est un groupe luxembourgeois de Death Metal Progressif.",
        },
        {
          ID: "98",
          nom: "Amaranthe",
          type: "metal",
          description: "Amaranthe est un groupe suédois de Power Metal, originaire de Göteborg qui mêle des riffs de Death Metal mélodique à des refrains Pop.",
        },
        {
          ID: "99",
          nom: "Vanir",
          type: "metal",
          description: "Vanir est un groupe de Viking/Folk Metal dannois.",
        },
      ],
      name: "",
      description: "",
      type: "",
      showButtons: false,
      btnClicked: false,
      success: false,
      result: "Perdu",
      points: 0,
      mallus: 0,
      entry: 0,
      startGame: true,
    };
  },
  methods: {
    displayName: function () {
      // je remet toutes les valeurs par défaut pour la prochaine manche
      this.textButton = "Suivant";
      this.showButtons = true;
      this.btnClicked = false;
      this.success = false;
      this.result = "Perdu";

      this.entry++;

      var tab = this.bdd;
      // je récupère un id aléatoirement dans la bdd
      var randomId = Math.floor(Math.random() * tab.length);
      // Je récupère et supprime l'entrée correspondante à l'id récupéré pour qu'elle n'apparaisse pas 2 fois dans le jeu
      var randomEntry = tab.splice(randomId, 1)[0];

      // je limite le nombre de génération d'entrée à 20
      if (tab.length >= 80) {
        // Je renvoie le nom de l'entrée random qui vient d'être supprimée
        this.name = randomEntry.nom;
        // Je renvoie le type de l'entrée random pour savoir si c'est pokémon ou metal
        this.type = randomEntry.type;
        // Je renvoie la description de l'entrée pour l'afficher une fois cliqué sur les boutons
        this.description = randomEntry.description;
      } else {
        this.startGame = false;
      }
    },
    pokemon: function () {
      this.btnClicked = true;

      if (this.type === "pokemon") {
        this.success = true;
        this.result = "Gagné";
        this.points++;
      } else {
        this.mallus++;
      }
    },
    metal: function () {
      this.btnClicked = true;

      if (this.type === "metal") {
        this.success = true;
        this.result = "Gagné";
        this.points++;
      } else {
        this.mallus++;
      }
    },
  },
  computed: {
    niveauFinal: function () {
      if (this.points <= 5) {
        return "Vous êtes nul";
      }

      if (this.points >= 6 && this.points <= 10) {
        return "Passable, vous pouvez faire mieux.";
      }

      if (this.points >= 10 && this.points <= 13) {
        return "Vous êtes dans la moyenne.";
      }

      if (this.points >= 14 && this.points <= 17) {
        return "Pas mal !";
      }

      if (this.points >= 18) {
        return "Bravo ! Vous êtes sûrement un fan de Pokemon et de Metal !";
      }
    },
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
