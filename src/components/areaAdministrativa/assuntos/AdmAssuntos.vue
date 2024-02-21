<template>
  <!--administração de assuntos e imagens-->
  <v-container fluid>

    <v-row>

      <!--espaço-->
      <v-col cols="1"></v-col>

      <!--configurações  de conteúdo para assuntos e imagens-->
      <v-col>

        <!--Configurações de conteúdo para assuntos e imagens-->
        <v-alert color="rgb(255,255,255,0.4)" rounded="xl">

          <!--Cabeçalho -->
          <v-row class="mb-3">

            <v-col align-self="center">
              <h3>Configurações de Conteúdo ( <span> Totem Normal </span>
                )</h3>
            </v-col>

          </v-row>

          <v-divider></v-divider>

          <!--Administração assuntos, e de imagens e textos e inserir nova imagem-->
          <v-container fluid>

            <!-- Area de seleção de assuntos/imagens-->
            <v-row class="mt-1">

              <!--Seleção de assuntos e adm de assuntos-->
              <v-col>

                <span class="ml-0 textoBranco">Selecione o assunto</span>

                <!--select de assuntos e btn Adm Assuntos-->
                <v-row>

                  <!--select de assuntos-->
                  <v-col cols="10">
                    <v-autocomplete
                      :items="assuntoSelect"
                      @change="getAtualAssunto"
                      clearable
                      dense
                      item-text="nome_assunto"
                      item-value="id"
                      label="Selecione o Assunto"
                      name="nome_assunto"
                      return-object
                      rounded
                      solo
                      v-model="myAssunto"
                    ></v-autocomplete>
                  </v-col>

                  <!--btn Administracão assuntos-->
                  <v-col>
                    <template>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn @click="openDialogAdmAssunto" block rounded v-bind="attrs"
                                 v-on="on">
                            <v-icon>mdi-pencil-box-outline</v-icon>
                          </v-btn>

                        </template>
                        <span>Administração de Assuntos</span>
                      </v-tooltip>
                    </template>
                  </v-col>

                </v-row>

              </v-col>

              <!--Separacao-->
              <v-col></v-col>

            </v-row>

            <!--Area de visualização de imagem e ajustes de imagens-->
            <v-row v-if="myAssunto !== null && myAssunto !== undefined && myAssunto !== ''">

              <!--exibição de Imagens e Ajustes de imagens-->
              <v-col align-self="start" cols="6"><span class="ml-0 textoBranco">Imagem</span>

                <!--Alert de Imagem-->
                <v-alert color="white" rounded="xl">

                  <v-img :src="this.$configSis.urlDownload + imagemAtual.imagem"
                         class="rounded-xl" v-if="qtdImg !== 0" aspect-ratio="1.5"/>

                  <v-img :src="require('../../../assets/img/noimage.png')"
                         v-else class="rounded-xl" aspect-ratio="1.5"/>

                  <v-alert rounded="xl" class="mt-3" color="grey lighten-3" v-if="imagemAtual.fonte">
                    <b>Fonte: </b> {{imagemAtual.fonte}}
                  </v-alert>

                  <!-- paginação, exclusão e edição de imagem-->
                  <v-row class="mt-2">

                    <!--Pagination-->
                    <v-col class="text-left">
                      <v-btn :key="objImg.id" @click="recebeImagemSolicitada(objImg.ordem)" class="primary mr-1 mb-2"
                             retain-focus-on-click rounded small v-for="objImg in arrayImages" v-if="qtdImg !== 0">
                        {{ objImg.ordem }}
                      </v-btn>
                    </v-col>

                    <!--Delete, ADD and Edit IMAGES-->
                    <v-col cols="4">

                      <!--Delete, add and Edit IMAGES-->
                      <v-row no-gutters>

                        <!--add-->
                        <v-col class="text-right mr-1">
                          <v-btn @click="openDialogAddImg" block class="primary" small>
                            <v-icon small>mdi-plus</v-icon>
                          </v-btn>
                        </v-col>

                        <!--edit-->
                        <v-col class="text-right mr-1" v-if="qtdImg !== 0">
                          <v-btn @click="openDialogEditImg" block class="warning" small>
                            <v-icon small>mdi-pen</v-icon>
                          </v-btn>
                        </v-col>

                        <!--delete-->
                        <v-col class="text-right" v-if="qtdImg !== 0">
                          <v-btn @click="openDialogDeletaImagem()" block class="error" small>
                            <v-icon small>mdi-delete</v-icon>
                          </v-btn>
                        </v-col>

                      </v-row>

                    </v-col>

                  </v-row>

                </v-alert>

              </v-col>

              <!--exibição de Legendas e saiba mais-->
              <v-col cols="6">
                <span class="ml-0 textoBranco" v-if="qtdImg !== 0">Título e Legenda da Imagem</span>
                <v-alert class="mb-0 pb-0" color="white" dense rounded="xl" v-if="qtdImg !== 0">
                  <v-row class="text-center">
                    <v-col>
                      <h3>{{ imagemAtual.nome }} <span v-if="imagemAtual.banner"> ( Banner )</span></h3>
                      <h4>Ordem de Exibição: {{ imagemAtual.ordem }}</h4>
                    </v-col>
                  </v-row>

                  <!--Legenda e saiba mais-->
                  <v-row>
                    <v-col>
                      <!--legenda -->
                      <v-alert class="rounded-xl">
                        <p><b>Legenda:</b></p>
                        <div v-html="imagemAtual.legenda" v-if="imagemAtual.legenda"></div>
                        <span v-else> Sem Legenda</span>
                      </v-alert>

                      <!--saiba mais-->
                      <v-alert class="rounded-xl">
                        <p><b>Saiba Mais:</b></p>
                        <div v-html="imagemAtual.saibamais" v-if="imagemAtual.saibamais"></div>
                        <span v-else> Sem Saiba Mais</span>
                      </v-alert>

                    </v-col>
                  </v-row>

                </v-alert>
              </v-col>

            </v-row>

          </v-container>

        </v-alert>

      </v-col>

      <!--espaço-->
      <v-col cols="1"></v-col>

    </v-row>

    <!--Dialog para administrar assunto-->
    <v-dialog max-width="70%" v-model="dialogAdmAssunto">
      <v-card>
        <v-card-title class="justify-center" primary-title>
          <v-row>
            <v-col cols="10">
              Administração de Assuntos
            </v-col>
            <v-col cols="2">
              <v-btn @click="openDialogAddAssunto">Adicionar Assunto</v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text>

          <v-container class="pt-5" fluid>

            <!--select de assuntos e btn Edit-->
            <v-row>

              <v-col>
                <v-data-table
                  :headers="headersAssuntos"
                  :items="assuntoSelect"
                  :search="searchAssuntos"
                  class="elevation-21 mt-4"
                  sort-by="ordem_exibicao"
                >
                  <template v-slot:top>
                    <v-toolbar
                      flat
                    >
                      <v-toolbar-title>Tabela de Assuntos Cadastrados</v-toolbar-title>

                      <v-divider
                        class="mx-4"
                        inset
                        vertical
                      ></v-divider>

                      <v-spacer></v-spacer>

                      <!--Pesquisar-->
                      <v-text-field
                        append-icon="mdi-magnify"
                        hide-details
                        label="Pesquisar"
                        placeholder="Pesquisar"
                        single-line
                        v-model="searchAssuntos"
                      ></v-text-field>

                      <!--Dialog para deletar assunto-->
                      <v-dialog max-width="800px" v-model="dialogDeleteAssunto">
                        <v-card>
                          <v-card-title class="justify-center" primary-title>
                            <v-icon
                              class="mr-4">
                              fa fa-exclamation-triangle
                            </v-icon>
                            Você tem certeza que quer deletar esse assunto?
                            <v-icon
                              class="ml-4">
                              fa fa-exclamation-triangle
                            </v-icon>

                          </v-card-title>
                          <v-card-text>
                            <div class="text-center">Essa ação é irreversível. <br>
                              Todas as imagens vinculadas a esse assunto também serão removidas.<br>
                              Tenha certeza do que está fazendo.
                            </div>
                          </v-card-text>
                          <v-card-actions class="pb-5">
                            <v-spacer></v-spacer>
                            <v-btn @click="dialogDeleteAssunto = false" color="grey lighten-1">Cancelar</v-btn>
                            <span class="pl-5 pr-5"></span>
                            <v-btn @click="deleteAssuntoConfirm" color="red lighten-1">Excluir</v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <!--Dialog para editar assunto-->
                      <v-dialog max-width="800px" v-model="dialogEditAssunto">
                        <v-card>
                          <v-form @submit.prevent="editAssuntoConfirm">
                            <v-card-title class="justify-center" primary-title>
                              Editar Assunto
                            </v-card-title>
                            <v-card-text>

                              <!--nome assunto-->
                              <v-row no-gutters>
                                <v-col>
                                  <span class="pl-3">Nome</span>
                                  <v-text-field
                                    class="ml-3"
                                    dense
                                    label="Nome Assunto"
                                    rounded
                                    solo
                                    v-model="nomeEditAssunto"
                                  ></v-text-field>
                                </v-col>
                              </v-row>

                              <!--ordem exibição-->
                              <v-row no-gutters>
                                <v-col>
                                  <span class="pl-3">Ordem de Exibição</span>
                                  <v-text-field
                                    class="ml-3"
                                    dense
                                    label="Ordem de Exibição"
                                    min="1"
                                    rounded
                                    solo
                                    type="number"
                                    v-model="ordemEditAssunto"
                                  ></v-text-field>
                                </v-col>
                              </v-row>

                            </v-card-text>
                            <v-card-actions class="pb-5">
                              <v-spacer></v-spacer>
                              <v-btn @click="dialogEditAssunto = false" color="warning lighten-1">Cancelar</v-btn>
                              <span class="pl-5 pr-5"></span>
                              <v-btn color="success" type="submit">Editar</v-btn>
                              <v-spacer></v-spacer>
                            </v-card-actions>

                          </v-form>
                        </v-card>

                      </v-dialog>

                    </v-toolbar>

                  </template>

                  <!--Template de botões para editar, excluir ASSUNTO -->
                  <template v-slot:item.actions="{ item }">

                    <!--editar -->
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          @click="editAssunto(item)"
                          class="mr-2"
                          small
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-pen
                        </v-icon>
                      </template>
                      <span>Editar Assunto</span>
                    </v-tooltip>

                    <!--Excluir-->
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          @click="deleteAssunto(item)"
                          class="mr-2"
                          small
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-delete
                        </v-icon>
                      </template>
                      <span>Excluir Assunto</span>
                    </v-tooltip>

                  </template>

                </v-data-table>
              </v-col>

            </v-row>

          </v-container>

        </v-card-text>

        <!--Fechar janela adm Assunto-->
        <v-card-actions class="pb-5 mr-5">
          <v-spacer></v-spacer>
          <v-btn
            @click="dialogAdmAssunto=false"
            color="error"
            elevation="2">Fechar
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <!--Dialog para add assunto-->
    <v-dialog max-width="800px" v-model="dialogAddAssunto">
      <v-card>
        <v-form @submit.prevent="efetuarCadastroAssunto">
          <v-card-title class="justify-center" primary-title>
            Adicionar novo assunto
          </v-card-title>
          <v-card-text>

            <!--nome assunto-->
            <v-row no-gutters>
              <v-col>
                <span class="pl-3">Nome</span>
                <v-text-field
                  class="ml-3"
                  dense
                  label="Nome Assunto"
                  rounded
                  solo
                  v-model="nomeNewAssunto"
                ></v-text-field>
              </v-col>
            </v-row>

            <!--ordem exibição-->
            <v-row no-gutters>
              <v-col>
                <span class="pl-3">Ordem de Exibição</span>
                <v-text-field
                  class="ml-3"
                  dense
                  label="Ordem de Exibição"
                  min="1"
                  rounded
                  solo
                  type="number"
                  v-model="ordemNewAssunto"
                ></v-text-field>
              </v-col>
            </v-row>

          </v-card-text>
          <v-card-actions class="pb-5">
            <v-spacer></v-spacer>
            <v-btn @click="dialogAddAssunto = false" color="warning lighten-1">Cancelar</v-btn>
            <span class="pl-5 pr-5"></span>
            <v-btn color="success" type="submit">Cadastrar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>

        </v-form>
      </v-card>

    </v-dialog>

    <!--Dialog para add imagem-->
    <v-dialog max-width="80%" v-model="dialogAddImagem">

      <!--Card de cadastro edição-->
      <v-card>

        <!--title-->
        <v-card-title>

          <v-icon class="mr-4">
            mdi-image-area
          </v-icon>
          <span class="headline">
                       Adicionar Imagem</span>

        </v-card-title>

        <v-card-text>

          <v-container>

            <v-form @submit.prevent="saveImage">

              <!--nome e imagem-->
              <v-row dense>

                <!--nome-->
                <v-col>
                  <span class="ml-3">Nome da Imagem</span>
                  <v-text-field
                    dense
                    hint="Por exemplo: Conquista de Monte Castelo (caso não coloque o nome, não aparecerá nada no Título da Imagem"
                    label="Nome da Imagem"
                    name="nome"
                    persistent-hint
                    placeholder="Insira um nome de referência"
                    required
                    rounded
                    solo
                    v-model="nomeNewImage">

                  </v-text-field>

                </v-col>

                <!--imagem-->
                <v-col>
                  <span class="ml-3">Imagem * (Campo Obrigatório)</span>
                  <v-file-input @change="selectImage"
                                accept="image/*"
                                dense
                                hint="Escolha uma imagem no formato .png ou .jpg"
                                label="Escolha uma imagem"
                                persistent-hint
                                placeholder="Insira uma imagem"
                                rounded
                                show-size
                                solo
                                v-model="inputImagem"
                  ></v-file-input>

                </v-col>

              </v-row>

              <!--ordem de exibicao e é banner-->
              <v-row dense>

                <!--ordem Exibicao-->
                <v-col>
                  <span class="ml-3">Ordem de Exibição</span>
                  <v-text-field
                    class="mr-3"
                    dense
                    hint="Ordem em que a imagem será exibida na paginação. Caso não coloque nada, o sistema irá entender que essa imagem deverá ser adicionada no final da lista."
                    label="Ordem de exibição"
                    min="1"
                    persistent-hint
                    rounded
                    solo
                    type="number"
                    v-model="imagemNewOrdem"
                  ></v-text-field>

                </v-col>

                <!--é banner?-->
                <v-col>

                  <v-checkbox
                    class="pl-3 pt-3"
                    hint="Se marcada, essa imagem será usada como referência do assunto na tela de navegação principal. Ao marcar a imagem como banner, caso haja mais de uma marcada, apenas a última será considerada para fins de exibição. Caso nenhuma seja marcada, a primeira imagem cadastrada será o banner"
                    label="É Banner"
                    persistent-hint
                    v-model="isImgNewBanner"
                  ></v-checkbox>

                </v-col>

              </v-row>

              <!--legenda e preview-->
              <v-row>

                <!--Legenda-->
                <v-col>

                  <v-alert class="rounded-xl">
                    <span>Legenda</span>
                    <vue-editor v-model="legendaNewImg"></vue-editor>
                    <span
                      class="caption">Se deixado em branco, a não será mostrado nenhum texto como legenda.</span>
                  </v-alert>

                </v-col>

                <!--preview-->
                <v-col>
                  <v-alert elevation="10" rounded="xl" v-if="previewImage">
                    <h3>Preview:</h3>
                    <img :src="previewImage" alt="" class="v-responsive my-3 ml-auto mr-auto rounded-xl"/>
                  </v-alert>

                  <!--fonte-->
                  <v-col>
                    <span class="ml-3">Fonte da Imagem</span>
                    <v-text-field
                      dense
                      hint="Por exemplo: https://eb.mil.br/1256"
                      label="Fonta da Imagem"
                      name="nome"
                      persistent-hint
                      placeholder="Insira a fonte da Imagem (SFC)"
                      required
                      rounded
                      solo
                      v-model="fonteNewImagem">

                    </v-text-field>

                  </v-col>

                </v-col>

              </v-row>

              <!--saibamais-->
              <v-row>
                <v-col>

                  <v-alert class="rounded-xl">
                    <span>Saiba Mais</span>
                    <vue-editor v-model="saibaMaisNewImg"></vue-editor>
                    <span
                      class="caption">Se deixado em branco, a não será mostrado nenhum texto como Saiba Mais.</span>
                  </v-alert>

                </v-col>
              </v-row>

              <!--Botões-->
              <v-row>

                <v-col class="text-right">

                  <!--Salvar-->
                  <v-btn
                    color="green darken-1"
                    type="submit">
                    Salvar
                  </v-btn>

                  <!--Cancelar-->
                  <v-btn
                    @click="dialogAddImagem = false"
                    class="ml-6"
                    color="red darken-1">
                    Cancelar
                  </v-btn>

                </v-col>

              </v-row>

            </v-form>

          </v-container>

        </v-card-text>

      </v-card>

    </v-dialog>

    <!--Dialog para deletar imagem-->
    <v-dialog max-width="800px" v-model="dialogDeleteImagem">
      <v-card>
        <v-card-title class="justify-center" primary-title>
          <v-icon
            class="mr-4">
            fa fa-exclamation-triangle
          </v-icon>
          Você tem certeza que quer deletar a imagem?
          <v-icon
            class="ml-4">
            fa fa-exclamation-triangle
          </v-icon>

        </v-card-title>
        <v-card-text>
          <div class="text-center">
            Essa ação é irreversível. Tenha certeza do que está fazendo.<br>
            A Legenda será excluída, e a ordem de exibição de todas as demais imagens será reajustada.
          </div>
        </v-card-text>
        <v-card-actions class="pb-5">
          <v-spacer></v-spacer>
          <v-btn @click="dialogDeleteImagem = false" color="grey lighten-1">Cancelar</v-btn>
          <span class="pl-5 pr-5"></span>
          <v-btn @click="deleteImagemConfirm" color="red lighten-1">Excluir</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--Dialog para editar imagem-->
    <v-dialog max-width="80%" v-model="dialogEditImagem">

      <!--Card de edição-->
      <v-card>

        <!--title-->
        <v-card-title>

          <v-icon class="mr-4">
            mdi-image-edit
          </v-icon>
          <span class="headline">
                       Editar Imagem</span>

        </v-card-title>

        <v-card-text>

          <v-container>

            <v-form @submit.prevent="saveEditImage">

              <!--nome e eBanner-->
              <v-row dense>

                <!--nome-->
                <v-col>
                  <span class="ml-3">Nome da Imagem</span>
                  <v-text-field
                    dense
                    hint="Por exemplo: Conquista de Monte Castelo (caso não coloque o nome, não aparecerá nada no Título da Imagem"
                    label="Nome da Imagem"
                    name="nome"
                    persistent-hint
                    placeholder="Insira um nome de referência"
                    required
                    rounded
                    solo
                    v-model="nomeEditImage">

                  </v-text-field>

                </v-col>

                <!--é banner?-->
                <v-col>

                  <v-checkbox
                    class="pl-3 pt-3"
                    hint="Se marcada, essa imagem será usada como referência do assunto na tela de navegação principal. Ao marcar a imagem como banner, caso haja mais de uma marcada, apenas a última será considerada para fins de exibição. Caso nenhuma seja marcada, a primeira imagem cadastrada será o banner"
                    label="É Banner"
                    persistent-hint
                    v-model="isImgEditBanner"
                  ></v-checkbox>

                </v-col>

              </v-row>

              <!--Assunto, ordem de exibicao, btn alterar image -->
              <v-row dense>

                <!--select de assunto-->
                <v-col cols="6">
                  <span class="ml-3">Assunto</span>
                  <v-autocomplete
                    :items="assuntoSelect"
                    clearable
                    dense
                    item-text="nome_assunto"
                    item-value="id"
                    label="Selecione o Assunto"
                    name="nome_assunto"
                    rounded
                    solo
                    v-model="myAssuntoEdit"
                  ></v-autocomplete>
                </v-col>

                <!--ordem Exibicao-->
                <v-col>
                  <span class="ml-3">Ordem de Exibição</span>
                  <v-text-field
                    class="ml-3"
                    dense
                    hint="Ordem em que a imagem será exibida na paginação. Caso não coloque nada, o sistema irá entender que essa imagem deverá ser adicionada no final da lista."
                    label="Ordem de exibição"
                    min="1"
                    persistent-hint
                    rounded
                    solo
                    type="number"
                    v-model="imagemEditOrdem"
                  ></v-text-field>

                </v-col>

                <!--btn edita imagem-->
                <v-col class="text-right">
                  <v-btn @click="toggleEditImagem" class="mt-6 warning" rounded> {{ textoBtnAlteraCancela }}</v-btn>
                </v-col>

              </v-row>

              <!--legenda e preview-->
              <v-row>

                <!--Legenda -->
                <v-col>

                  <!--legenda-->
                  <v-alert class="rounded-xl">
                    <span>Legenda</span>
                    <vue-editor v-model="legendaEditImg"></vue-editor>
                    <span
                      class="caption">Se deixado em branco, a não será mostrado nenhum texto como legenda.</span>
                  </v-alert>

                </v-col>

                <!--preview-->
                <v-col>

                  <!--se input imagem-->
                  <v-row v-if="showHideEditInputImage">
                    <!--imagem-->
                    <v-col>
                      <span class="ml-3">Imagem * (Campo Obrigatório)</span>
                      <v-file-input @change="selectEditImage"
                                    accept="image/*"
                                    dense
                                    hint="Escolha uma nova imagem no formato .png ou .jpg (a anterior será excluída)"
                                    label="Escolha uma imagem"
                                    persistent-hint
                                    placeholder="Insira uma imagem"
                                    rounded
                                    show-size
                                    solo
                                    v-model="inputEditImagem"

                      ></v-file-input>

                      <v-alert border="left" type="warning" v-if="!previewEditImage">Para finalizar a alteração da
                        imagem, após a escolha da
                        nova, é
                        necessário revisar os campos do formulário e apertar no botão "Salvar".<br>Isso destruirá a foto
                        anterior.
                      </v-alert>

                    </v-col>
                  </v-row>

                  <!--preview Img-->
                  <v-alert elevation="10" rounded="xl" v-if="previewEditImage">
                    <h3>Preview:</h3>
                    <img :src="previewEditImage" alt="" class="v-responsive my-3 ml-auto mr-auto rounded-xl"/>
                  </v-alert>

                  <!--mostra imagem atual-->
                  <v-row v-if="!showHideEditInputImage">
                    <v-col>
                      <v-img :src="this.$configSis.urlDownload + imagemAtual.imagem"
                             class="rounded-xl v-responsive ml-auto mr-auto" width="600px"/>
                    </v-col>
                  </v-row>

                  <!--fonte-->
                  <v-row>
                    <v-col>
                      <span class="ml-3">Fonte da Imagem</span>
                      <v-text-field
                        dense
                        hint="Por exemplo: https://eb.mil.br/1256"
                        label="Fonta da Imagem"
                        name="nome"
                        persistent-hint
                        placeholder="Insira a fonte da Imagem (SFC)"
                        required
                        rounded
                        solo
                        v-model="fonteEditImagem">

                      </v-text-field>

                    </v-col>
                  </v-row>

                </v-col>

              </v-row>

              <!-- saiba mais-->
              <v-row>
                <v-col>
                  <v-alert class="rounded-xl">
                    <span>Saiba Mais</span>
                    <vue-editor v-model="saibaMaisEditImg"></vue-editor>
                    <span
                      class="caption">Se deixado em branco, a não será mostrado nenhum texto como Saiba Mais.</span>
                  </v-alert>
                </v-col>
              </v-row>

              <!--Botões-->
              <v-row>

                <v-col class="text-right">

                  <!--Salvar-->
                  <v-btn
                    color="green darken-1"
                    type="submit">
                    Salvar
                  </v-btn>

                  <!--Cancelar-->
                  <v-btn
                    @click="dialogEditImagem = false"
                    class="ml-6"
                    color="red darken-1">
                    Cancelar
                  </v-btn>

                </v-col>

              </v-row>

            </v-form>

          </v-container>

        </v-card-text>

      </v-card>

    </v-dialog>

  </v-container>
</template>

<script>import {logoutMixin} from '@/mixins'
import {mapGetters} from 'vuex'
import config from '../../../http/config'

export default {
  name: 'home',
  mixins: [logoutMixin],
  components: {},
  data: vm => ({
    configSis: config,
    dialogGeneric70: false,
    assuntoSelect: [],
    editedIndex: -1,
    searchAssuntos: '',
    headersAssuntos: [
      {
        text: 'Ordem Exibição',
        align: 'start',
        value: 'ordem_exibicao'
      },
      {
        text: 'Nome',
        align: 'start',
        value: 'nome_assunto'
      },
      {
        text: 'Actions',
        value: 'actions',
        align: 'center',
        sortable: false
      }
    ],
    totemConfigs: {
      nome_totem: '',
      altura_index: '',
      largura_index: '',
      altura_detail: '',
      largura_detail: '',
      access_code: '',
      tipo_totem: ''
    },
    dialogAdmAssunto: false,
    dialogDeleteAssunto: false,
    dialogEditAssunto: false,
    dialogAddAssunto: false,
    ordemNewAssunto: '',
    nomeNewAssunto: '',
    editedAssuntoIndex: -1,
    editedAssunto: {},
    nomeEditAssunto: '',
    ordemEditAssunto: '',
    dialogAddImagem: false,
    editedImageIndex: -1,
    abrePreviewEdit: false,
    currentImage: undefined,
    previewImage: undefined,
    inputImagem: undefined,
    legendaImg: '',
    nomeNewImage: '',
    fonteNewImagem: '',
    imagemNewOrdem: '',
    isImgNewBanner: false,
    legendaNewImg: '',
    saibaMaisNewImg: '',
    myAssunto: '',
    qtdImg: 0,
    arrayImages: [],
    imagemAtual: {},
    dialogDeleteImagem: false,
    dialogEditImagem: false,
    nomeEditImage: '',
    imagemEditOrdem: '',
    isImgEditBanner: false,
    legendaEditImg: '',
    fonteEditImagem: '',
    saibaMaisEditImg: '',
    myAssuntoEdit: {},
    previewEditImage: undefined,
    currentEditImage: undefined,
    inputEditImagem: undefined,
    showHideEditInputImage: false,
    textoBtnAlteraCancela: 'Alterar a Imagem Atual',
    selectedTypeOfContent: ''
  }),
  computed: {
    formTitle () {
      return this.editedImageIndex === -1 ? this.textoBtnNovaPos : this.textoBtnEditarPos
    },
    ...mapGetters(['usuarioLogado'])
  },
  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },

    dialogAddImagem (val) {
      if (this.editedIndex === -1) {
        this.currentImage = undefined
        this.previewImage = undefined
        this.inputImagem = undefined
      }
      val || this.closeAddImge()
    }

  },
  async mounted () {
    await this.getAssuntos()
  },
  methods: {
    async getAssuntos () {
      try {
        this.$http.get('assunto')
          .then(response => {
            this.assuntoSelect = response.data
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    retornaTotem () {
      this.$store.commit('DESLOGAR_USUARIO')
      this.$router.push({name: 'index'})
    },

    // ASSUNTO
    editAssunto (item) {
      this.editedAssuntoIndex = this.assuntoSelect.indexOf(item)
      this.editedAssunto = Object.assign({}, item)
      this.nomeEditAssunto = this.editedAssunto.nome_assunto
      this.ordemEditAssunto = this.editedAssunto.ordem_exibicao
      this.dialogEditAssunto = true
    },

    closeDeleteAssunto () {
      this.dialogDeleteAssunto = false
      this.$nextTick(() => {
        this.editedAssunto = {}
        this.editedAssuntoIndex = -1
      })
    },

    openDialogAdmAssunto () {
      this.dialogAdmAssunto = true
    },

    deleteAssunto (item) {
      this.editedAssuntoIndex = this.assuntoSelect.indexOf(item)
      this.editedAssunto = Object.assign({}, item)
      this.dialogDeleteAssunto = true
    },

    deleteAssuntoConfirm () {
      this.$http.delete('assunto/' + this.editedAssunto.id)
        .then(() => {
          this.getAssuntos()
          this.closeDeleteAssunto()
          this.$toastr.s(
            'Assunto removido com sucesso', 'Sucesso!'
          )
        }, err => {
          console.log(err)
          this.$toastr.e(
            'Não foi possível remover o Assunto', 'Erro!'
          )
        })
    },

    efetuarCadastroAssunto () {
      if (this.nome_assunto === '') {
        this.$toastr.e(
          'Não foi possível realizar o cadastro! Todos os capos devem ser preenchidos.', 'Erro!'
        )
      } else {
        let objetoParaEnvio = {}
        objetoParaEnvio['nome_assunto'] = this.nomeNewAssunto
        objetoParaEnvio['ordem_exibicao'] = this.ordemNewAssunto

        try {
          this.$http.post('assunto', objetoParaEnvio)
            .then(() => {
              this.getAssuntos()
              this.dialogAddAssunto = false
            })
            .catch(erro => console.log(erro))
        } catch (e) {
          console.log(e)
        }
      }
    },

    openDialogAddAssunto () {
      this.nomeNewAssunto = ''
      this.ordemNewAssunto = ''
      this.dialogAddAssunto = true
    },

    editAssuntoConfirm () {
      if (this.nomeEditAssunto === '' || this.nomeEditAssunto === null) {
        this.$toastr.e(
          'Não foi possível alterar o Assunto.', 'Verifique novamente os campos!'
        )
      } else {
        let objetoParaEnvio = {}
        objetoParaEnvio['nome_assunto'] = this.nomeEditAssunto
        objetoParaEnvio['ordem_exibicao'] = this.ordemEditAssunto

        this.$http.put('assunto/' + this.editedAssunto.id, objetoParaEnvio)
          .then(() => {
            this.getAssuntos()
            this.$toastr.s(
              'Assunto alterado com sucesso', 'Sucesso!'
            )
            this.dialogEditAssunto = false
          }, err => {
            console.log(err)
            this.$toastr.e(
              'Não foi possível alterar o Assunto.', 'Erro!'
            )
          })
      }
    },

    // Fim Assunto

    openDialogAddImg () {
      this.dialogAddImagem = true
      this.abrePreviewEdit = false
      this.currentImage = undefined
      this.previewImage = undefined
      this.inputImagem = undefined
      this.legendaImg = ''
      this.nomeNewImage = ''
      this.imagemNewOrdem = ''
      this.isImgNewBanner = false
      this.legendaNewImg = ''
      this.saibaMaisNewImg = ''
      this.fonteNewImagem = ''
    },

    openDialogEditImg () {
      this.dialogEditImagem = true
      this.abrePreviewEdit = false
      this.currentEditImage = undefined
      this.previewEditImage = undefined
      this.inputEditImagem = undefined
      this.showHideEditInputImage = false
      this.textoBtnAlteraCancela = 'Alterar a Imagem Atual'

      this.nomeEditImage = this.imagemAtual.nome
      this.imagemEditOrdem = this.imagemAtual.ordem

      this.isImgEditBanner = this.imagemAtual.banner
      this.legendaEditImg = this.imagemAtual.legenda
      this.fonteEditImagem = this.imagemAtual.fonte
      this.saibaMaisEditImg = this.imagemAtual.saibamais
      this.myAssuntoEdit = this.imagemAtual.assunto_id
    },

    getAtualAssunto () {
      try {
        this.$http.get('img/assunto/' + this.myAssunto.id)
          .then(response => {
            this.getImgExib(response.data)
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    getImgExib (arrayImgIni) {
      if (arrayImgIni.length === 0) {
        this.qtdImg = 0
      } else {
        this.qtdImg = arrayImgIni.length
        this.arrayImages = arrayImgIni
        this.imagemAtual = arrayImgIni[0]
      }
    },

    saveImage () {
      // ARRUMAR
      if (this.currentImage !== undefined) {
        let formData = new FormData()
        formData.append('imagem', this.currentImage)
        formData.append('fonte', this.fonteNewImagem)
        formData.append('nome', this.nomeNewImage)
        formData.append('ordem', this.imagemNewOrdem)
        formData.append('banner', this.isImgNewBanner)
        formData.append('legenda', this.legendaNewImg)
        formData.append('saibamais', this.saibaMaisNewImg)
        formData.append('assunto_id', this.myAssunto.id)
        return this.$http.post('img', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(() => {
          this.getAtualAssunto()
          this.$toastr.s(
            'Imagem cadastrada com sucesso', 'Sucesso!'
          )
          this.dialogAddImagem = false
        })
          .catch(() => {
            this.$toastr.e(
              'Não foi possível cadastrar a imagem', 'Erro!'
            )
            this.dialogAddImagem = false
          })
      } else {
        this.$toastr.e(
          'Você deve selecionar ao menos uma Imagem.', 'Erro!'
        )
      }
    },

    saveEditImage () {
      let formData = new FormData()
      formData.append('id', this.imagemAtual.id)
      formData.append('imagem', this.currentEditImage)
      formData.append('nome', this.nomeEditImage)
      formData.append('ordem', this.imagemEditOrdem)
      formData.append('banner', this.isImgEditBanner)
      formData.append('fonte', this.fonteEditImagem)
      formData.append('legenda', this.legendaEditImg)
      formData.append('saibamais', this.saibaMaisEditImg)
      formData.append('assunto_id', this.myAssuntoEdit)
      formData.append('trocaImagem', this.showHideEditInputImage)
      return this.$http.post('img/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        console.log(response.data)
        this.dialogEditImagem = false
        this.getAtualAssunto()
        this.$toastr.s(
          'Imagem editada com sucesso', 'Sucesso!'
        )
        this.dialogAddImagem = false
      })
        .catch(() => {
          this.$toastr.e(
            'Não foi possível editar a imagem', 'Erro!'
          )
          this.dialogAddImagem = false
        })
    },

    selectImage (image) {
      if (image === null || image === undefined) {
        this.currentImage = undefined
        this.previewImage = undefined
        this.inputImagem = undefined
      } else {
        this.currentImage = image
        this.previewImage = URL.createObjectURL(this.currentImage)
      }
    },

    selectEditImage (image) {
      if (image === null || image === undefined) {
        this.currentEditImage = undefined
        this.previewEditImage = undefined
        this.inputEditImagem = undefined
      } else {
        this.currentEditImage = image
        this.previewEditImage = URL.createObjectURL(this.currentEditImage)
      }
    },

    closeAddImge () {
      this.dialogAddImagem = false
    },

    recebeImagemSolicitada (ordem) {
      for (let i = 0; i < this.arrayImages.length; i++) {
        if (ordem === this.arrayImages[i].ordem) {
          this.imagemAtual = this.arrayImages[i]
        }
      }
    },

    openDialogDeletaImagem () {
      this.dialogDeleteImagem = true
    },

    deleteImagemConfirm () {
      this.$http.delete('img/' + this.imagemAtual.id)
        .then(() => {
          for (let i = 0; i < this.arrayImages.length; i++) {
            if (this.arrayImages[i].id === this.imagemAtual.id) {
              this.arrayImages.splice(i, 1)
            }
          }
          this.getImgExib(this.arrayImages)
          this.dialogDeleteImagem = false
          this.$toastr.s(
            'Imagem removida com sucesso', 'Sucesso!'
          )
        }, err => {
          console.log(err)
          this.$toastr.e(
            'Não foi possível remover a Imagem', 'Erro!'
          )
        })
    },

    toggleEditImagem () {
      this.currentEditImage = undefined
      this.previewEditImage = undefined
      this.inputEditImagem = undefined
      if (this.showHideEditInputImage) {
        this.showHideEditInputImage = false
        this.textoBtnAlteraCancela = 'Alterar a Imagem Atual'
      } else {
        this.showHideEditInputImage = true
        this.textoBtnAlteraCancela = 'Cancelar alteração de Imagem'
      }
    }
  }
}
</script>

<style>

.textoBranco {
  color: white;
}
</style>
