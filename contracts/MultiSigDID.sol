// SPDX-License-Identifier: BSD
pragma solidity ^0.8.9;

/**
 * @title MultiSig DID Contract
 * @author Aryan Shukla, Mohammad Touseef, Mudit Jain, Dr. Harkeerat Kaur
 * @notice This contract is just used for demonstration and experimental purposes
 */
contract MultiSigDID{

    error MultiSigDID__userAlreadyExists(); 
    error MultiSigDID__userIDisRevoked() ; 
    error MultiSigDID__NotOwner();

    event newUserReg(
        address user
    ); 

    enum STATUS{
        ACTIVE,
        REVOKED
    }

    /**
     * This struct stores that the approval for a change is approved by both the owner and the government
     */
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

    /**
     * This struct stores most of the information of the DID
     */
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
        if(msg.sender != owner){
            revert MultiSigDID__NotOwner() ;
        }
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

    /**
     * Notice all the information stored is encrypted and as per Aadhar Card
     * @param _name name of the user
     * @param _dateOfBirth date of Birth of the user
     * @param _fatherName father's name
     * @param _motherName mother's name
     * @param _addrLine1 address of the user
     * @param _pinCode address of the user
     * @param _faceVector faceVector of the user
     * @param _fingerPrint fingerPrint of the user
     * @param _phoneNumber phoneNumber of the user
     * @param _user wallet address of the user
     */
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
        external
        onlyOwner
    {
        // the check ensures that the user is not already registered
        if(userAddressToDID[_user].exists) revert MultiSigDID__userAlreadyExists() ;  
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
            initialEntry, 
            initialEntry, 
            true
        );
        emit newUserReg(msg.sender); 
    }

    /**
     * This function is only triggered when approval from both the owner and the government is received
     * @param walletAddress wallet address of user
     * @param field field to change
     * @param newVal newval to be put (encrypted)
     */
    function updateUserInfo(
        address walletAddress,
        uint field, 
        string memory newVal
    ) internal {

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

    /**
     * This function checks if the change is approved by both the owner and the government
     * @param walletAddress wallet address of user
     * @return true if approved by both parties else false
     */
    function isApproved (address walletAddress) view internal returns(bool) {
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

    /**
     * This function can be used by government or the owner to approve a change
     * @param walletAddress wallet address of user
     * @param field field to change
     * @param newVal newval to be put (encrypted)
     * only the owner or the government can call this function 
     * Also initiates updateUserInfo if both parties approve
     */
    function approveChange(
        address walletAddress, 
        uint field, 
        string memory newVal 
    ) external {
        if(userAddressToDID[walletAddress]._status == STATUS.REVOKED) return; 
        if(owner == msg.sender) userAddressToDID[walletAddress]._governmentApproval = fieldChange(true, field, newVal);  
        else if (walletAddress == msg.sender) userAddressToDID[walletAddress]._ownerApproval = fieldChange(true, field, newVal); 

        if(isApproved(walletAddress)){
            updateUserInfo(walletAddress, field, newVal); 
        }
    }

    /**
     * This function returns the required information of the user
     * @param walletAddress wallet address of user
     * @param field field to return
     * only the wallet owner 
     */
    function getInfo(
        address walletAddress, 
        uint field
    )
    external view returns(string memory)
    {
        if(userAddressToDID[walletAddress]._status == STATUS.REVOKED) revert MultiSigDID__userIDisRevoked();
        if(walletAddress != msg.sender ) revert MultiSigDID__NotOwner() ; 
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
