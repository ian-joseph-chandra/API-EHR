// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.0 <0.9.0;

contract Doctors {
    struct Doctor{
        string name;
        address hospital;
    }

    mapping(address => Doctor) doctors;

    function create (address _id, string memory _name, address _hospital_id) public {
        doctors[_id] = Doctor({
            name: _name,
            hospital: _hospital_id
        });
    }

    function read (address _id) public view returns (
        string memory _name,
        address _hospital
    ){
        _name = doctors[_id].name;
        _hospital = doctors[_id].hospital;
    }
}
