<template>
	<div>
		<vue-editor :value="model" @input="$emit('update:model',$event)" useCustomImageHandler @image-added="handleImageAdded"
			:placeholder="placeholder" :class="{'border border-danger': error, 'border border-success': valid }"
			:editor-toolbar="customToolBar"
		/>
		<span class="small text-danger" v-if="error">{{ error }}</span>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { VueEditor } from 'vue2-editor'

const customToolBar = [
	[{size:['small',false,'large','huge']}],
	/*[{header: [false,1,2,3,4,5,6]}],*/ ['bold','italic','underline','strike'],
	[{script: 'sub'},{script: 'super'}],
	[{indent: '-1'},{indent: '+1'}],
	/*[{align:''},{align:'center'},{align:'right'},{align:'justify'}],*/
	['blockquote','code-block'], [{list:'ordered'},{list:'bullet'},/*{list:'check'}*/],
	/*[{color:[]},{background:[]}],*/ ['link','image',/*'video','formula'*/],['clean']
]

export default {
	components: { 'vue-editor': VueEditor },
	data: () => ({ customToolBar }),
	props: {
		model: {
			required: true
		},
		path: {
			required: true,
			type: String
		},
		placeholder: {
			required: true,
			type: String
		},
		error: {
			required: true
		},
		valid: {
			required: true
		}
	},
	methods: {
		...mapActions(['uploadFromEditor']),
		async handleImageAdded(file, editor, cursorLocation, resetUploader) {
			try{
				await this.uploadFromEditor({
					file, editor, cursorLocation, resetUploader,
					path: `editor/${this.path}`
				})
			}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
		}
	}
}
</script>
