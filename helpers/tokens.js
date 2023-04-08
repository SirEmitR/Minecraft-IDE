class Material {
    constructor() {
      this.materiales = ["piedra", "madera", "cemento", "ladrillo", "lana"];
    }
  
    getToken() {
      let str = "";
      for (let i = 0; i < this.materiales.length; i++) {
        str += this.materiales[i];
        if (i !== this.materiales.length - 1) {
          str += "|";
        }
      }
      return str;
    }
}

const tokens = [
    {
        code: 'material', exp: `\^(${new Material().getToken()})$` 
    }
]

export default tokens