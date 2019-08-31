export default function reducerSearchOptions(state={
        searchOptions:  {
            typeOptions:[
                {key:'Artifact',        text:'Artifact',        value:'Artifact'},
                {key:'Creature',        text:'Creature',        value:'Creature'},
                {key:'Enchantment',     text:'Enchantment',     value:'Enchantment'},
                {key:'Instant',         text:'Instant',         value:'Instant'},
                {key:'Land',            text:'Land',            value:'Land'},
                {key:'Planeswalker',    text:'Planeswalker',    value:'Planeswalker'},
                {key:'Sorcery',         text:'Sorcery',         value:'Sorcery'},
            ],
            rarityOptions:[
                {key:'Common',      text:'Common',      value:'Common'},
                {key:'Uncommon',    text:'Uncommon',    value:'Uncommon'},
                {key:'Rare',        text:'Rare',        value:'Rare'},
                {key:'Mythic Rare', text:'Mythic Rare', value:'Mythic Rare'}
            ],
            pageSizes:[
                {key:10,    text:10,    value:10},
                {key:20,    text:20,    value:20},
                {key:30,    text:30,    value:30},
                {key:50,    text:50,    value:50},
            ],
            cmcOptions:[
                {key:0,     text:0,     value:0},
                {key:1,     text:1,     value:1},
                {key:2,     text:2,     value:2},
                {key:3,     text:3,     value:3},
                {key:4,     text:4,     value:4},
                {key:5,     text:5,     value:5},
                {key:6,     text:6,     value:6},
                {key:7,     text:7,     value:7},
                {key:8,     text:8,     value:8},
                {key:9,     text:9,     value:9},
                {key:10,    text:10,    value:10}
            ],
            colorOptions:[
                {key:'White',       text:'White',       value:'W'},
                {key:'Blue',        text:'Blue',        value:'U'},
                {key:'Green',       text:'Green',       value:'G'},
                {key:'Red',         text:'Red',         value:'R'},
                {key:'Black',       text:'Black',       value:'B'},
                {key:'Colorless',   text:'Colorless',   value:'C'}
            ],
            gameFormatOptions:[
                {key:'Standard',    text:'Standard',    value:'Standard'},
                {key:'Modern',      text:'Modern',      value:'Modern'},
                {key:'Legacy',      text:'Legacy',      value:'Legacy'},
                {key:'Classic',     text:'Classic',     value:'Classic'},
                {key:'Commander',   text:'Commander',   value:'Commander'}
            ]
        },

        responseStats: null

    }, action) {

        switch (action.type){
            case 'UPDATE_STATS':
                state.responseStats=null
                return {...state, responseStats: action.payload.heads}
                
            default:
                return state
        }
}