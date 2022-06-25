import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'

import conf from './config'

export default function Comic() {

  let { id } = useParams()
  let navigate = useNavigate();

  const [data, setdata] = useState(-1)

  const getComicStrip = async (id) => {
    if (id) {
      axios.get(conf.baseURL + `${id}`)
        .then(res => setdata(res.data))
        .catch(err => {
          if (err.response.status >= 400) {
            navigate("/")
          }
        })
    }
    else {
      let localLatest = localStorage.getItem('latest')
      if (localLatest) {
        navigate(`/${localLatest}`)
      }
      else {
        axios.get(conf.baseURL)
          .then(res => {
            setdata(res.data)
            return res.data
          })
          .then(res => localStorage.setItem("latest", res['num']))
          .catch(err => {
            if (err.response.status >= 400) {
              navigate("/")
            }
          })
      }
    }
  }

  const getNextComicStrip = () => {
    if (data['num']) {
      navigate(`/${data['num'] + 1}`);
    }
  }

  const getPrevComicStrip = () => {
    if (data['num']) {
      navigate(`/${data['num'] - 1}`);
    }
  }

  const parseTranscipt = (text) => {
    let nt = text?.replaceAll(/\\n/g, "\<br\>")
    return nt
  }

  const getRandomStrip = () => {
    let localLatest = localStorage.getItem('latest')
    let randomId = Math.floor(Math.random() * localLatest || 2000) + 1
    navigate(`/${randomId}`);
  }

  useEffect(() => {
    getComicStrip(id)

  }, [id])


  return (
    <div className="v-container">

      <div className="h-container">
        <div>
          <button className="btn" onClick={() => getPrevComicStrip()}> prev </button>
        </div>
        <div>
          <button className="btn" onClick={() => getRandomStrip()}>random</button>
        </div>
        <div>
          <button className="btn" onClick={() => getNextComicStrip()}> next</button>
        </div>
      </div>


      <main>

        <div className="center">
          <div className="title">
            <p>{data['safe_title']}</p>
          </div>
          <div className="box">
            <div className="boxinner">{data['views']} 👀 </div>
            <div className='img-container'>
              <img src={data['img']} className="image"></img>
            </div>
          </div>
        </div>

        <div className='transcript '>
          <p>{parseTranscipt(data['transcript'])}</p>
        </div>
      </main>




    </div >
  )
}
