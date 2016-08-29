 <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                    <Swiper style={styles.wrapper} showsButtons={true} dot={<View style={{backgroundColor:'#ccffcc', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
                        <View style={styles.slide1}>
                            <View style={styles.picShowcase}>
                                <Image style={styles.showcase} source={require('../../imgTeam/2.jpg')}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 350}}> 
                                <View style={{width:50}}>
                                    <Button large rounded block transparent onPress={() => {this._exitModal()}}>
                                        <Icon name="ios-exit-outline" style={{color: '#FFF'}} />
                                    </Button>
                                </View>
                                <View style={{width:200}}>
                                </View>
                                <View style={{width: 50}}>
                                    <Button large rounded block transparent onPress={() => {this._setProfile(2)}}>
                                        <Icon name="ios-checkmark-circle-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                

                                
                            </View>

                        </View>
                        <View style={styles.slide2}>
                            <View style={styles.picShowcase}>
                                <Image style={styles.showcase} source={require('../../imgTeam/3.png')}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 350}}> 
                                <View style={{width:50}}>
                                    <Button large rounded block transparent onPress={() => {this._exitModal()}}>
                                        <Icon name="ios-exit-outline" style={{color: '#FFF'}} />
                                    </Button>
                                </View>
                                <View style={{width:200}}>
                                </View>
                                <View style={{width: 50}}>
                                    <Button large rounded block transparent onPress={() => {this._setProfile(3)}}>
                                        <Icon name="ios-checkmark-circle-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                

                                
                            </View>
                         </View>
                         <View style={styles.slide3}>
                            <View style={styles.picShowcase}>
                                <Image style={styles.showcase} source={require('../../imgTeam/4.png')}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 350}}> 
                                <View style={{width:50}}>
                                    <Button large rounded block transparent onPress={() => {this._exitModal()}}>
                                        <Icon name="ios-exit-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                <View style={{width:200}}>
                                </View>
                                <View style={{width: 50}}>
                                    <Button large rounded block transparent onPress={() => {this._setProfile(4)}}>
                                        <Icon name="ios-checkmark-circle-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                

                                
                            </View>
                            </View>

                            <View style={styles.slide4}>
                            <View style={styles.picShowcase}>
                                <Image style={styles.showcase} source={require('../../imgTeam/5.png')}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 350}}> 
                                <View style={{width:50}}>
                                    <Button large rounded block transparent onPress={() => {this._exitModal()}}>
                                        <Icon name="ios-exit-outline" style={{color: '#FFF'}} />
                                    </Button>
                                </View>
                                <View style={{width:200}}>
                                </View>
                                <View style={{width: 50}}>
                                    <Button large rounded block transparent onPress={() => {this._setProfile(5)}}>
                                        <Icon name="ios-checkmark-circle-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                

                                
                            </View>

                        </View>
                        <View style={styles.slide5}>
                            <View style={styles.picShowcase}>
                                <Image style={styles.showcase} source={require('../../imgTeam/6.jpg')}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 350}}> 
                                <View style={{width:50}}>
                                    <Button large rounded block transparent onPress={() => {this._exitModal()}}>
                                        <Icon name="ios-exit-outline" style={{color: '#FFF'}} />
                                    </Button>
                                </View>
                                <View style={{width:200}}>
                                </View>
                                <View style={{width: 50}}>
                                    <Button large rounded block transparent onPress={() => {this._setProfile(6)}}>
                                        <Icon name="ios-checkmark-circle-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                

                                
                            </View>
                         </View>
                         <View style={styles.slide6}>
                            <View style={styles.picShowcase}>
                                <Image style={styles.showcase} source={require('../../imgTeam/7.png')}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 350}}> 
                                <View style={{width:50}}>
                                    <Button large rounded block transparent onPress={() => {this._exitModal()}}>
                                        <Icon name="ios-exit-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                <View style={{width:200}}>
                                </View>
                                <View style={{width: 50}}>
                                    <Button large rounded block transparent onPress={() => {this._setProfile(7)}}>
                                        <Icon name="ios-checkmark-circle-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                

                                
                            </View>
                        </View>
                        
                    </Swiper>
                  </Modal>