const bankState = {};
function filterListByBank(bank) {
    return ifscData.filter(function(item) {
     return item.BANK === bank;
     })
    }
function filterListByBankAndState(bank, state) {
    return ifscData.filter(function(item) {
        return item.BANK === bank && item.STATE === state;
        })
    }  
function filterListByBankAndStateAndDistrict(bank, state,district) {
    return ifscData.filter(function(item) {
        return item.BANK === bank && item.STATE === state && item.DISTRICT === district;
        })
    }  
function filterListByBankAndStateAndDistrictAndBranch(bank, state,district,branch) {
    return ifscData.filter(function(item) {
        return item.BANK === bank && item.STATE === state && item.DISTRICT === district && item.BRANCH===branch;
        })
    }   
async function downloadData() {
        const res = await fetch('ifsc.json');
        window.ifscData = await res.json();
        const fullBankList = ifscData.map(function(item){
            return item.BANK;
            })
        const bankSet = new Set(fullBankList)
        bankState.uniqueBankList = Array.from(bankSet);
        function fillBankListIntoSelect() {
            const bankSelect = document.getElementById('Bank')
            bankState.uniqueBankList.forEach(function (element) {
            const newOption = document.createElement("OPTION");
            newOption.text = element;
            newOption.value = element;
            bankSelect.add(newOption)
            })
           }
           fillBankListIntoSelect()
    }
downloadData();
  
document.getElementById('Bank').onchange = function(){
    const bank = document.getElementById('Bank').value
    const json_object = filterListByBank(bank)
    const all_states = json_object.map(function(item){
        return item.STATE
    })
    const UniqueStates = new Set(all_states)
    const states = Array.from(UniqueStates);
    const StateSelect = document.getElementById("State")
    states.forEach(element => {
        const newOption = document.createElement("OPTION");
        newOption.text = element;
        newOption.value = element;
        StateSelect.add(newOption)
    });

}   
document.getElementById('State').onchange = function(){
    const bank = document.getElementById('Bank').value
    const state = document.getElementById('State').value
    const json_object = filterListByBankAndState(bank,state)
    const all_districts = json_object.map(function(item){
        return item.DISTRICT
    })
    const UniqueDistricts = new Set(all_districts)
    const districts = Array.from(UniqueDistricts);
    const districtselect = document.getElementById("District")
    districts.forEach(element => {
        const newOption = document.createElement("OPTION");
        newOption.text = element;
        newOption.value = element;
        districtselect.add(newOption)
    });

}    
document.getElementById('State').onchange = function(){
    const bank = document.getElementById('Bank').value
    const state = document.getElementById('State').value
    const json_object = filterListByBankAndState(bank,state)
    const all_districts = json_object.map(function(item){
        return item.DISTRICT
    })
    const UniqueDistricts = new Set(all_districts)
    const districts = Array.from(UniqueDistricts);
    const districtselect = document.getElementById("District")
    districts.forEach(element => {
        const newOption = document.createElement("OPTION");
        newOption.text = element;
        newOption.value = element;
        districtselect.add(newOption)
    });

}
document.getElementById('District').onchange = function(){
    const bank = document.getElementById('Bank').value
    const state = document.getElementById('State').value
    const district = document.getElementById('District').value

    const json_object = filterListByBankAndStateAndDistrict(bank,state,district)
    const all_branch = json_object.map(function(item){
        return item.BRANCH
    })
    const UniqueBranch = new Set(all_branch)
    const branches = Array.from(UniqueBranch);
    const branchselect = document.getElementById("Branch")
    branches.forEach(element => {
        const newOption = document.createElement("OPTION");
        newOption.text = element;
        newOption.value = element;
        branchselect.add(newOption)
    });

}
document.getElementById('IFSC').onclick = function(){
    const bank = document.getElementById('Bank').value
    const state = document.getElementById('State').value
    const district = document.getElementById('District').value
    const branch = document.getElementById('Branch').value
    const json_object = filterListByBankAndStateAndDistrictAndBranch(bank,state,district,branch)[0]
    alert("IFSC Code :"+json_object.IFSC )
}