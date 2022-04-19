// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.0 <0.9.0;

contract Patients {
    struct Patient{
        string name;
        string ecdh_public_key;
    }

    mapping(address => Patient) patients;
    mapping(address => address[]) hospitals;

    function create (address _id, string memory _name, string memory _ecdh_public_key) public {
        patients[_id] = Patient({
            name: _name,
            ecdh_public_key: _ecdh_public_key
        });
    }

    function read (address _id) public view returns (
        string memory _name,
        string memory _ecdh_public_key,
        address[] memory _hospitals
    ){
        _name = patients[_id].name;
        _ecdh_public_key = patients[_id].ecdh_public_key;
        _hospitals = hospitals[_id];
    }
}
