Bu projede Paribucineverse için sinema biletlerinin nft olarak verilmesini denedim.
Biletlerin nft olarak dağıtılması Paribu için bir tüketici loyalty programı oluşturabilir.
Başka bir bakış açısı ile de bakarsak bilet alan tüketicinin bu nftleri koleksiyon halinde biriktirebilir ve loyalty programından faydalanabilir.

Ticket kontratı : Aslında basit bir ERC721 kontratı. Farklı olarak filmin başlama tarihi ve kullanılıp kullanılmamasını tutuyor.

Helper kontratı : createNewTicket fonksiyonu vizyona girecek her yeni film için yeni bir ticket kontratı yaratır. 
                  mint fonksiyonu bilet almak isteyen kullanıcıya belirli bir ücret karşılığında biletini mint eder.
                  withdraw fonksiyonu, helper kontratında biriken varlıkları admin'in çekmesine olanak tanır.


Deploy için hardhat.config.js içindeki PRIVATE_KEY kısmına private keyininzi yazıp 
`npx hardhat run ./scripts/deploy.js --network <networkadı>` komudunu çalıştırmanız yeterli.

Yeni film ticketı oluşturmak için createNewTicket.js, kontratta birikin "ether"i çekmek için withdraw.js scriptlerini çalıştırabilirsiniz.

Aynı zamanda bir frontend de geliştirdim repoya burdan: https://github.com/0xEnsar/finalcase-frontend
Siteye burdan : https://candid-starburst-03fdd5.netlify.app/ ulaşabilirsiniz
