import { client } from '../client';
import { hashID } from './data';

const feedUsers = () => {

  // const TLC = {
  //   _id: hashID('TLC'),
  //   _type: 'user',
  //   userName: 'TLC',
  //   image: "https://chuongtang.github.io/sourceStore/memories/TLC.png",
  // }

  // client.createIfNotExists(TLC).then((res) => {
  //   console.log(`TLC document ID is ${res._id}`)
  // })

  // const Unaunin = {
  //   _id: hashID('Unaunin'),
  //   _type: 'user',
  //   userName: 'Unaunin',
  //   image: "https://chuongtang.github.io/sourceStore/memories/Mai.png",
  // }

  // client.createIfNotExists(Unaunin).then((res) => {
  //   console.log(`Mai document ID is ${res._id}`)
  // })
  // const In = {
  //   _id: hashID('In'),
  //   _type: 'user',
  //   userName: 'In',
  //   image: "https://chuongtang.github.io/sourceStore/memories/In.png",
  // }

  // client.createIfNotExists(In).then((res) => {
  //   console.log(`In document ID is ${res._id}`)
  // })
  // const Nghe = {
  //   _id: hashID('Nghe'),
  //   _type: 'user',
  //   userName: 'Nghe',
  //   image: "https://chuongtang.github.io/sourceStore/memories/Nghe.png",
  // }

  // client.createIfNotExists(Nghe).then((res) => {
  //   console.log(`Nghe document ID is ${res._id}`)
  // })
  // const Rong = {
  //   _id: hashID('Rong'),
  //   _type: 'user',
  //   userName: 'Rong',
  //   image: "https://chuongtang.github.io/sourceStore/memories/Rong.png",
  // }

  // client.createIfNotExists(Rong).then((res) => {
  //   console.log(`Rong document ID is ${res._id}`)
  // })
  const Queenie = {
    _id: hashID('Queenie'),
    _type: 'user',
    userName: 'Queenie',
    image: "https://chuongtang.github.io/sourceStore/memories/Queenie.png",
  }

  client.createIfNotExists(Queenie).then((res) => {
    console.log(`Queenie document ID is ${res._id}`)
  })
}
export default feedUsers;