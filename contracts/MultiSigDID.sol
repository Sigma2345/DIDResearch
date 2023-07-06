// SPDX-License-Identifier: BSD
pragma solidity ^0.8.9;

/**
 * @title MultiSig DID Contract
 * @author Mohammad Touseef, Aryan, Mudit Jain, Dr. Harkeerat Kaur
 * @notice This contract is just used for demonstration and experimental purposes
 */
contract MultiSigDID{

    enum STATUS{
        ACTIVE,
        REVOKED
    }

    struct fieldChange{
        bool approved;
        uint fieldNum;
        string newVal;
    }

    struct Address{
        string line1;
        string pinCode;
    }

    struct Biometrics{
        string faceVector; // can be made vector
        string fingerPrint; 
    }

    struct DID{
        string _name; 
        string _dateOfBirth; 
        string _fatherName; 
        string _motherName; 
        Address _address; 
        Biometrics _biometrics;
        string _phoneNumber;
        STATUS _status;
        fieldChange _governmentApproval;
        fieldChange _ownerApproval;          
        bool exists;
    }

    mapping (address => DID) public userAddressToDID ;    
    mapping (uint256 => string) private parameterToValue ; 
    address public owner ; 
    fieldChange initialEntry = fieldChange(false, 0, "");

    modifier onlyOwner(){
        require(msg.sender == owner, "User is not authorized to add new user");
        _;  
    }

    constructor () {
        owner = msg.sender ; 
    }

    function changeOwner(
        address _newOwner
    ) public onlyOwner {
        owner = _newOwner ; 
    }

    function addUser(
        string memory _name, 
        string memory _dateOfBirth, 
        string memory _fatherName, 
        string memory _motherName, 
        string memory _addrLine1, 
        string memory _pinCode, 
        string memory _faceVector, 
        string memory _fingerPrint, 
        string memory _phoneNumber, 
        address _user
    ) 
        public 
        onlyOwner
    {
        if(userAddressToDID[_user].exists) return ;  
        Address memory userAddress = Address(
            _addrLine1, 
            _pinCode
        ); 

        Biometrics memory userBiometrics = Biometrics(
            _faceVector, 
            _fingerPrint
        );  
        userAddressToDID[_user] = DID(
            _name, 
            _dateOfBirth, 
            _fatherName, 
            _motherName, 
            userAddress,
            userBiometrics, 
            _phoneNumber, 
            STATUS.ACTIVE, 
            fieldChange(false, 1, ""), 
            fieldChange(false, 1, ""), 
            true
        );
    }

    function updateUserInfo(
        address walletAddress,
        uint field, 
        string memory newVal
    ) private {

        if(field==1) userAddressToDID[walletAddress]._name = newVal ;
        else if(field==2) userAddressToDID[walletAddress]._dateOfBirth = newVal ;
        else if(field==3) userAddressToDID[walletAddress]._fatherName = newVal ;
        else if(field==4) userAddressToDID[walletAddress]._motherName = newVal ;
        else if(field==5) userAddressToDID[walletAddress]._address.line1 = newVal ;
        else if(field==6) userAddressToDID[walletAddress]._address.pinCode = newVal ;
        else if(field==7) userAddressToDID[walletAddress]._biometrics.faceVector = newVal ;
        else if(field==8) userAddressToDID[walletAddress]._biometrics.fingerPrint = newVal ;
        else if(field==9) userAddressToDID[walletAddress]._phoneNumber = newVal ;
        else userAddressToDID[walletAddress]._status = STATUS.REVOKED ; 

        userAddressToDID[walletAddress]._governmentApproval = initialEntry;
        userAddressToDID[walletAddress]._ownerApproval = initialEntry;      
    }

    function isApproved (address walletAddress) view private returns(bool) {
        if(!userAddressToDID[walletAddress]._governmentApproval.approved ||
            !userAddressToDID[walletAddress]._ownerApproval.approved
        ){
            return false; 
        }
        if(userAddressToDID[walletAddress]._governmentApproval.fieldNum != 
            userAddressToDID[walletAddress]._ownerApproval.fieldNum){
                return false; 
        }
        string memory str1 = userAddressToDID[walletAddress]._governmentApproval.newVal ; 
        string memory str2 = userAddressToDID[walletAddress]._ownerApproval.newVal ; 

        if(bytes(str1).length != bytes(str2).length ) return false; 
        for(uint i =0 ; i<bytes(str1).length ; i++ ){
            if(bytes(str1)[i]!=bytes(str2)[i]) return false; 
        }
        return true; 
    }

    function approveChange(
        address walletAddress, 
        uint field, 
        string memory newVal 
    ) public {
        if(userAddressToDID[walletAddress]._status == STATUS.REVOKED) return; 
        if(owner == msg.sender) userAddressToDID[walletAddress]._governmentApproval = fieldChange(true, field, newVal);  
        else if (walletAddress == msg.sender) userAddressToDID[walletAddress]._ownerApproval = fieldChange(true, field, newVal); 

        if(isApproved(walletAddress)){
            updateUserInfo(walletAddress, field, newVal); 
        }
    }

    function getInfo(
        address walletAddress, 
        uint field
    )
    public view returns(string memory)
    {
        
        if(field==1) return userAddressToDID[walletAddress]._name ;
        else if(field==2) return userAddressToDID[walletAddress]._dateOfBirth  ;
        else if(field==3) return userAddressToDID[walletAddress]._fatherName  ;
        else if(field==4) return userAddressToDID[walletAddress]._motherName  ;
        else if(field==5) return userAddressToDID[walletAddress]._address.line1  ;
        else if(field==6) return userAddressToDID[walletAddress]._address.pinCode  ;
        else if(field==7) return userAddressToDID[walletAddress]._biometrics.faceVector  ;
        else if(field==8) return userAddressToDID[walletAddress]._biometrics.fingerPrint  ;
        else if(field==9) return userAddressToDID[walletAddress]._phoneNumber ;

        return "" ; 
    }
}
