import React, { useState, useEffect } from 'react';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

import icon_profile_my from '../../assets/icon-profile-my.png';
import EditIcon from '@material-ui/icons/Edit';
//masks
import { cpfMask, maskTel, durationContractMask } from '../../utils/maskInputs';
//------------------------------------------------------------
import { useAuthContext } from '../../Context/AuthContext';
import { detailUser, editUser } from '../../controller/Investor/index';

import './styles.css';

export default function ViewProfile() {
  const { user } = useAuthContext();
  // const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [imgProfile, setImgProfile] = useState('');

  useEffect(() => {
    async function getDetailProfile() {
      const data = await detailUser(user.id);
      //  setLogin(data.login);
      setName(data.name);
      setLastName(data.last_name);
      setCpf(data.identif);
      setTel(maskTel(data.tel));
      setEmail(data.email);
      setImgProfile(data.profile);
    }

    getDetailProfile();
  }, []);

  //Funçao trata os dados passados no formulario , e chamara funçao que fara a requisiçao de update.
  async function handdleSubmit(e) {
    e.preventDefault();
    const data = {
      // name,
      // last_name: lastName,
      tel,
      email,
      profile: imgProfile.profile,
    };
    const response = await editUser(data);
    alert(response);
  }

  function handdleInputImage(image) {
    const reader = new FileReader();
    const pattern = '/[Ii]+[Mm]+[Aa]+[Gg]+[Ee]/';
    if (image.profile.type.search(pattern) === -1) {
      alert('Por favor insira uma imagem');
      return;
    }

    reader.onload = () => setImgProfile({ url: reader.result, profile: image });
    reader.readAsDataURL(image);
  }

  console.log(imgProfile);
  return (
    <Container className="container-login">
      <HeaderBackground notLogin={true} />
      <main className="main-myprofile">
        <div className="title-header">
          <h1>Perfil</h1>
        </div>

        <div className="content-form">
          <div className="photo-ptofile">
            <img src={imgProfile.url ? imgProfile.url : icon_profile_my} />
          </div>
          <form
            encType="multipart/form-data"
            onSubmit={(e) => handdleSubmit(e)}
          >
            <div className="upload-photo">
              <label htmlFor="photo">ALTERAR FOTO</label>
              <input
                id="photo"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => handdleInputImage(e.target.files[0])}
              />
            </div>

            <div className="no-edit-form">
              <label htmlFor="nome" className="label">
                Nome
              </label>
              <input type="text" readOnly={true} value={name} />
            </div>
            <div className="no-edit-form">
              <label htmlFor="sobreNome" className="label">
                Sobre nome
              </label>
              <input type="text" readOnly={true} value={lastName} />
            </div>

            <div className="edit-form">
              <label htmlFor="tel" className="label">
                Telefone
              </label>
              <input
                id="tel"
                type="text"
                onChange={(e) => setTel(maskTel(e.target.value))}
                value={tel}
              />
              <EditIcon className="icon-edit" />
            </div>

            <div className="edit-form">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <EditIcon className="icon-edit" />
            </div>

            <button style={{ padding: '10px 90px', marginTop: '30px' }}>
              SALVAR
            </button>
          </form>

          <h3>Alterar senha</h3>
        </div>
      </main>
      <FooterBackground notLogin={true} />
    </Container>
  );
}

/* <div className="no-edit-form">
<label htmlFor="login" className="label">
  Login
</label>
<input type="text" readOnly={true} value={login} />
</div> */
