// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.0 <0.9.0;

contract Hospitals {
    struct Hospital{
        string name;
        string ecdh_public_key;
    }

    mapping(address => Hospital) hospitals;
    mapping(address => address[]) patients;

    function create (address _id, string memory _name, string memory _ecdh_public_key) public {
        hospitals[_id] = Hospital({
            name: _name,
            ecdh_public_key: _ecdh_public_key
        });
    }

    function read (address _id) public view returns (
        string memory _name,
        string memory _ecdh_public_key,
        address[] memory _patients
    ){
        _name = hospitals[_id].name;
        _ecdh_public_key = hospitals[_id].ecdh_public_key;
        _patients = patients[_id];
    }
}
