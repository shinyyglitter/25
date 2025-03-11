function RecordStoreAbstractInterface(){
  return{
    create,
    read,
    update,
    purge
  }
}

class RecordStoreAbstractInterface {
    async create() {
      throw new Error("Not implemented");
    }
    
    async read() {
      throw new Error("Not implemented");
    }
    
    async update() {
      throw new Error("Not implemented");
    }
    
    async remove() {
      throw new Error("Not implemented");
    }
  }

  
export default RecordStoreAbstractInterface