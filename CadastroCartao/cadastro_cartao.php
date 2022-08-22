<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="Kairos | Pagamento do plano">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="../assets/img/favicon.ico" type="image/x-icon">
  <link rel="stylesheet" href="../assets/css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap"
    rel="stylesheet">
  <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet">

  <title>Pagamento</title>
  <?php
    error_reporting(E_ERROR | E_PARSE);
    session_start();
    $_SESSION['plano']=$_GET['plano'];
    $dbHost     = 'localhost';
    $dbUname = 'root';
    $dbPass = '';
    $dbName     = 'kairos';

    $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

    if($conec->connect_error){ // se não for localhost, usa a conexão do banco no site
        $dbHost = 'sql309.epizy.com';
        $dbUname = 'epiz_31926454';
        $dbPass = 'VOjqZcbwH38iVo';
        $dbName = 'epiz_31926454_Banco_Kairos';
        $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");
    }

    $email = $_SESSION['email'];
    $select = mysqli_query($conec, "SELECT id from cartao where email_usuario='$email'")->fetch_assoc()['id'];

    
    if($select){ // alteração de plano contratado
      $plano = $_GET['plano'];
      $result_alterar=mysqli_query($conec, "UPDATE cartao SET assinatura='$plano' WHERE email_usuario='$email'") or die(mysqli_error($conec)."alteração_plano");
      header('Location: ../Perfil/usuario?'.md5('sucesso=true'));
      exit;
  }
  ?>
</head>

<body class="body-form cartao">

  <div class="container" id="app">
    <div class="card-form">
      <div class="card-list">
        <div class="card-item" v-bind:class="{ '-active' : isCardFlipped }">
          <div class="card-item__side -front">
            <div class="card-item__focus" v-bind:class="{'-active' : focusElementStyle }"
              v-bind:style="focusElementStyle" ref="focusElement"></div>
            <div class="card-item__cover">
              <img v-bind:src="'assets/imagens/' + currentCardBackground + '.jpeg'" class="card-item__bg">
            </div>

            <div class="card-item__wrapper">
              <div class="card-item__top">
                <img type="text/html" src="assets/imagens/chip.png" class="card-item__chip">
                <div class="card-item__type">
                  <transition name="slide-fade-up" id='ultimo'>
                    <img v-bind:src="'assets/imagens/' + getCardType + '.png'" v-if="getCardType"
                      v-bind:key="getCardType" alt="" class="card-item__typeImg " id="imagem">
                  </transition>
                </div>
              </div>
              <label for="cardNumber" class="card-item__number" ref="cardNumber">
                <template v-if="getCardType === 'amex'">
                  <span v-for="(n, $index) in amexCardMask" :key="$index">
                    <transition name="slide-fade-up">
                      <div class="card-item__numberItem"
                        v-if="$index > 4 && $index < 14 && cardNumber.length > $index && n.trim() !== ''">*</div>
                      <div class="card-item__numberItem" :class="{ '-active' : n.trim() === '' }" :key="$index"
                        v-else-if="cardNumber.length > $index">
                        {{cardNumber[$index]}}
                      </div>
                      <div class="card-item__numberItem" :class="{ '-active' : n.trim() === '' }" v-else
                        :key="$index + 1">{{n}}</div>
                    </transition>
                  </span>
                </template>

                <template v-else>
                  <span v-for="(n, $index) in otherCardMask" :key="$index">
                    <transition name="slide-fade-up">
                      <div class="card-item__numberItem"
                        v-if="$index > 4 && $index < 15 && cardNumber.length > $index && n.trim() !== ''">*</div>
                      <div class="card-item__numberItem" :class="{ '-active' : n.trim() === '' }" :key="$index"
                        v-else-if="cardNumber.length > $index">
                        {{cardNumber[$index]}}
                      </div>
                      <div class="card-item__numberItem" :class="{ '-active' : n.trim() === '' }" v-else
                        :key="$index + 1">{{n}}</div>
                    </transition>
                  </span>
                </template>
              </label>
              <div class="card-item__content">
                <label for="cardName" class="card-item__info" ref="cardName">
                  <div class="card-item__holder">Titular Do Cartão</div>
                  <transition name="slide-fade-up">
                    <div class="card-item__name" v-if="cardName.length" key="1">
                      <transition-group name="slide-fade-right">
                        <span class="card-item__nameItem" v-for="(n, $index) in cardName.replace(/\s\s+/g, ' ')"
                          v-if="$index === $index" v-bind:key="$index + 1">{{n}}</span>
                      </transition-group>
                    </div>
                    <div class="card-item__name" v-else key="2">Nome Completo</div>
                  </transition>
                </label>
                <div class="card-item__date" ref="cardDate">
                  <label class="card-item__dateTitle">Validade</label>
                  <label class="card-item__dateItem">
                    <transition name="slide-fade-up">
                      <span v-if="cardMonth" v-bind:key="cardMonth">{{cardMonth}}</span>
                      <span v-else key="2">MM</span>
                    </transition>
                  </label>
                  /
                  <label for="cardYear" class="card-item__dateItem">
                    <transition name="slide-fade-up">
                      <span v-if="cardYear" v-bind:key="cardYear">{{String(cardYear).slice(2,4)}}</span>
                      <span v-else key="2">AA</span>
                    </transition>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="card-item__side -back">
            <div class="card-item__cover">
              <img v-bind:src="'assets/imagens/' + currentCardBackground + '.jpeg'" class="card-item__bg">
            </div>
            <div class="card-item__band"></div>
            <div class="card-item__cvv">
              <div class="card-item__cvvTitle">CVV</div>
              <div class="card-item__cvvBand">
                <span v-for="(n, $index) in cardCvv" :key="$index">
                  *
                </span>

              </div>
              <div class="card-item__type">
                <img v-bind:src="'assets/imagens/' + getCardType + '.png'" v-if="getCardType"
                  class="card-item__typeImg">
              </div>
            </div>
          </div>
        </div>
      </div>
      <form method="POST" action="assets/php/cadastrar_cartao" onsubmit="return false" autocomplete="off"
        class="formulario">
        <div class="form-caixa">
          <label for="cardNumber">Número do Cartão</label>
          <input type="tel" id="cardNumber" v-mask="generateCardNumberMask" v-model="cardNumber" v-on:focus="focusInput"
            v-on:blur="blurInput" data-ref="cardNumber" autocomplete="cc-csc" name='num_cartao'
            aria-controls="cardNumberAlert">
          <div id='cardNumberAlert'></div>
        </div>

        <div class="form-caixa">
          <label for="cardName">Nome Impresso no Cartão</label>
          <input type="text" id="cardName" v-model="cardName" v-on:focus="focusInput" v-on:blur="blurInput"
            data-ref="cardName" autocomplete="cc-csc" name='nome_cartao' maxlength="30" onkeyup="apenasLetras(this)"
            aria-controls="cardNameAlert">
          <div id='cardNameAlert'></div>
        </div>
        <div class="form-caixa validade">
          <label>Data de Validade</label>
          <div class="info-validade">
            <select class="form-caixa__input" id="cardMonth" v-model="cardMonth" v-on:focus="focusInput"
              v-on:blur="blurInput" data-ref="cardDate" name='mes_cartao' aria-controls="cardMonthAlert">
              <option value="" disabled selected>Mês</option>
              <option v-bind:value="n < 10 ? '0' + n : n" v-for="n in 12" v-bind:disabled="n < minCardMonth"
                v-bind:key="n">
                {{n < 10 ? '0' + n : n}} </option>
            </select>
            <select class="form-caixa__input" id="cardYear" v-model="cardYear" v-on:focus="focusInput"
              v-on:blur="blurInput" data-ref="cardDate" name='ano_cartao' aria-controls="cardYearAlert">
              <option value="" disabled selected>Ano</option>
              <option v-bind:value="$index + minCardYear" v-for="(n, $index) in 12" v-bind:key="n">
                {{$index + minCardYear}}
              </option>
            </select>
          </div>
          <label for="cardCvv">CVV</label>
          <input type="tel" id="cardCvv" v-mask="'###'" maxlength="3" v-model="cardCvv" v-on:focus="flipCard(true)"
            v-on:blur="flipCard(false)" autocomplete="cc-csc" name='cvv_cartao' aria-controls="cardCvvAlert">
          <div id='cardCvvAlert'></div>
          <div id='cardYearAlert'></div>
          <div id='cardMonthAlert'></div>
        </div>


        <div class="info-usuario">
          <div class="form-caixa">
            <label for="cpf">CPF</label>
            <input type="tel" class="form-caixa__input " id="cpf" name='cpf' onkeypress="$(this).mask('000.000.000-00')"
              aria-controls="cpfAlert">
            <div id='cpfAlert'></div>
          </div>

          <div class="form-caixa">
            <label for="cep">CEP</label>
            <input type="tel" id="cep" name='cep' onkeypress="$(this).mask('00.000-000')" onkeyup="lerCEP(this)"
              aria-controls="cepAlert">
            <div id='cepAlert'></div>
          </div>

          <div class="form-caixa">

            <label for="numero">Número</label>
            <input type="tel" id="numero" name='numero' maxlength="6" aria-controls="numeroAlert">
            <div id='numeroAlert'></div>

            <input type="text" class="none" id="rua" name='rua'>
            <input type="text" class="none" id="bairro" name='bairro'>
            <input type="text" class="none" id="cidade" name='cidade'>
            <input type="text" class="none" id="estado" name='estado'>

          </div>
        </div>
        <div id='endereco' class="none"></div>

        <button class="btn primario" onclick="validar()" id='butao' type="button">
          Finalizar
        </button>
        <button class="btn terciario" type="reset" onclick="cancelar()">
          Cancelar
        </button>
      </form>
    </div>
  </div>
  </div>
</body>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="https://cdn.lordicon.com/lusqsztk.js"></script>

<script src="../assets/js/globals.js"></script>
<script src="../assets/js/formulario.js"></script>
<script src="../assets/js/popup.js"></script>

<script src='https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js'></script>
<script src='https://unpkg.com/vue-the-mask@0.11.1/dist/vue-the-mask.js'></script>
<script src="assets/js/animacaoCartao.js"></script>

<script src="assets/js/script.js"></script>

</html>