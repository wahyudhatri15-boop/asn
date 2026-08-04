const fs = require('fs');

let html = fs.readFileSync('database-soal.html', 'utf8');

const brokenCode = `                saveDB();
            }
        }`;

const replacementCode = `
        function openAddModal() {
            document.getElementById('modal-title').innerText = "Tambah Soal";
            document.getElementById('q-index').value = -1;

            document.getElementById('q-image').value = '';
            document.getElementById('q-image-preview').src = '';
            document.getElementById('q-image-preview').classList.add('hidden');
            window.currentQuestionImage = null;

            document.getElementById('q-answer-image').value = '';
            document.getElementById('q-answer-image-preview').src = '';
            document.getElementById('q-answer-image-preview').classList.add('hidden');
            window.currentAnswerImage = null;

            for(let i=1; i<=5; i++) {
                if (document.getElementById('q-opt-'+i+'-image')) {
                    document.getElementById('q-opt-'+i+'-image').value = '';
                    document.getElementById('q-opt-'+i+'-image-preview').src = '';
                    document.getElementById('q-opt-'+i+'-image-preview').classList.add('hidden');
                    window['currentOpt' + i + 'Image'] = null;
                }
            }

            if (document.getElementById('q-pembahasan').setValue) {
                document.getElementById('q-pembahasan').setValue('');
            } else {
                document.getElementById('q-pembahasan').value = '';
            }
            
            let isMath = true;
            
            if (isMath) {
                document.getElementById('q-text').classList.remove('hidden');
                document.getElementById('q-answer').classList.remove('hidden');
                document.getElementById('q-text-plain').classList.add('hidden');
                document.getElementById('q-answer-plain').classList.add('hidden');
                
                if (document.getElementById('q-text').setValue) {
                    document.getElementById('q-text').setValue('');
                    document.getElementById('q-answer').setValue('');
                } else {
                    document.getElementById('q-text').value = '';
                    document.getElementById('q-answer').value = '';
                }
                document.getElementById('q-text-plain').required = false;
                document.getElementById('q-answer-plain').required = false;
            } else {
                document.getElementById('q-text').classList.add('hidden');
                document.getElementById('q-answer').classList.add('hidden');
                document.getElementById('q-text-plain').classList.remove('hidden');
                document.getElementById('q-answer-plain').classList.remove('hidden');
                
                document.getElementById('q-text-plain').value = '';
                document.getElementById('q-answer-plain').value = '';
                document.getElementById('q-text-plain').required = true;
                document.getElementById('q-answer-plain').required = true;
            }
            
            let showOptions = true;
            if (showOptions) {
                document.getElementById('options-container').classList.remove('hidden');
                document.getElementById('q-answer-container').classList.add('hidden');
                for(let i=1; i<=5; i++) document.getElementById('q-opt-'+i).required = true;
                document.getElementById('q-radio-1').checked = true;
                for(let i=1; i<=5; i++) document.getElementById('q-opt-'+i).value = '';
                
                document.getElementById('q-answer-plain').required = false;
            } else {
                document.getElementById('options-container').classList.add('hidden');
                document.getElementById('q-answer-container').classList.remove('hidden');
                for(let i=1; i<=5; i++) document.getElementById('q-opt-'+i).required = false;
                
                if (!isMath) document.getElementById('q-answer-plain').required = true;
            }
            
            document.getElementById('question-modal').classList.add('show');
            setTimeout(() => {
                let qText = document.getElementById('q-text');
                if (!qText.classList.contains('hidden')) {
                    qText.focus();
                } else {
                    document.getElementById('q-text-plain').focus();
                }
            }, 100);
        }

        function editQuestion(index) {
            let item = questions[index];
            document.getElementById('modal-title').innerText = "Edit Soal";
            document.getElementById('q-index').value = index;
            
            document.getElementById('q-image').value = '';
            if (item.image) {
                document.getElementById('q-image-preview').src = item.image;
                document.getElementById('q-image-preview').classList.remove('hidden');
                window.currentQuestionImage = item.image;
            } else {
                document.getElementById('q-image-preview').src = '';
                document.getElementById('q-image-preview').classList.add('hidden');
                window.currentQuestionImage = null;
            }

            document.getElementById('q-answer-image').value = '';
            if (item.aImage) {
                document.getElementById('q-answer-image-preview').src = item.aImage;
                document.getElementById('q-answer-image-preview').classList.remove('hidden');
                window.currentAnswerImage = item.aImage;
            } else {
                document.getElementById('q-answer-image-preview').src = '';
                document.getElementById('q-answer-image-preview').classList.add('hidden');
                window.currentAnswerImage = null;
            }

            for(let i=1; i<=5; i++) {
                if (document.getElementById('q-opt-'+i+'-image')) {
                    document.getElementById('q-opt-'+i+'-image').value = '';
                    if (item.optImages && item.optImages[i-1]) {
                        document.getElementById('q-opt-'+i+'-image-preview').src = item.optImages[i-1];
                        document.getElementById('q-opt-'+i+'-image-preview').classList.remove('hidden');
                        window['currentOpt' + i + 'Image'] = item.optImages[i-1];
                    } else {
                        document.getElementById('q-opt-'+i+'-image-preview').src = '';
                        document.getElementById('q-opt-'+i+'-image-preview').classList.add('hidden');
                        window['currentOpt' + i + 'Image'] = null;
                    }
                }
            }

            if (document.getElementById('q-pembahasan').setValue) {
                document.getElementById('q-pembahasan').setValue(item.pembahasan || '');
            } else {
                document.getElementById('q-pembahasan').value = item.pembahasan || '';
            }

            let qText = item.q || item.question || '';
            let aText = item.a || item.answer || '';
            
            let isMath = true;
            if (isMath) {
                document.getElementById('q-text').classList.remove('hidden');
                document.getElementById('q-answer').classList.remove('hidden');
                document.getElementById('q-text-plain').classList.add('hidden');
                document.getElementById('q-answer-plain').classList.add('hidden');
                
                document.getElementById('q-text').value = qText;
                document.getElementById('q-answer').value = aText;
                
                document.getElementById('q-text-plain').required = false;
                document.getElementById('q-answer-plain').required = false;
            } else {
                document.getElementById('q-text').classList.add('hidden');
                document.getElementById('q-answer').classList.add('hidden');
                document.getElementById('q-text-plain').classList.remove('hidden');
                document.getElementById('q-answer-plain').classList.remove('hidden');
                
                document.getElementById('q-text-plain').value = qText;
                document.getElementById('q-answer-plain').value = aText;
                
                document.getElementById('q-text-plain').required = true;
                document.getElementById('q-answer-plain').required = true;
            }
            
            let showOptions = true;
            if (showOptions) {
                document.getElementById('options-container').classList.remove('hidden');
                document.getElementById('q-answer-container').classList.add('hidden');
                for(let i=1; i<=5; i++) document.getElementById('q-opt-'+i).required = true;
                document.getElementById('q-answer-plain').required = false;
                
                let opts = item.options || [];
                let optImages = item.optImages || [];
                for(let i=1; i<=5; i++) {
                    document.getElementById('q-opt-'+i).value = opts[i-1] || '';
                    if (opts[i-1] === aText && aText !== '') {
                        document.getElementById('q-radio-'+i).checked = true;
                    }
                    if (document.getElementById('q-opt-'+i+'-image')) {
                        document.getElementById('q-opt-'+i+'-image').value = '';
                        if (optImages[i-1]) {
                            document.getElementById('q-opt-'+i+'-image-preview').src = optImages[i-1];
                            document.getElementById('q-opt-'+i+'-image-preview').classList.remove('hidden');
                            window['currentOpt' + i + 'Image'] = optImages[i-1];
                        } else {
                            document.getElementById('q-opt-'+i+'-image-preview').src = '';
                            document.getElementById('q-opt-'+i+'-image-preview').classList.add('hidden');
                            window['currentOpt' + i + 'Image'] = null;
                        }
                    }
                }
            } else {
                document.getElementById('options-container').classList.add('hidden');
                document.getElementById('q-answer-container').classList.remove('hidden');
                for(let i=1; i<=5; i++) document.getElementById('q-opt-'+i).required = false;
                
                if (!isMath) document.getElementById('q-answer-plain').required = true;
            }
            
            document.getElementById('question-modal').classList.add('show');
            setTimeout(() => {
                let qText = document.getElementById('q-text');
                if (!qText.classList.contains('hidden')) {
                    qText.focus();
                } else {
                    document.getElementById('q-text-plain').focus();
                }
            }, 100);
        }

        function deleteQuestion(index) {
            if(confirm('Yakin ingin menghapus soal ini?')) {
                questions.splice(index, 1);
                saveDB();
            }
        }`;

html = html.replace(brokenCode, replacementCode);

fs.writeFileSync('database-soal.html', html);
console.log("Fixed!");
